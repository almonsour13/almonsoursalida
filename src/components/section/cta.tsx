"use client";
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type PanInfo,
} from "framer-motion";
import {
    ArrowUpRight,
    Code,
    Database,
    PanelsTopLeft,
    PenTool,
    Server,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DotSprayTexture from "../decorative/dot-spray-texture";
import GradientDotGrid from "../decorative/gradient-dot-grid";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const AREA_HEIGHT = 300; // px, height of the hanging area
const PULL_BELOW = 40; // px, extra stretch into the card's bottom padding
const ICON_SIZE = 56; // px
const STAGGER = 0.12; // s between icons dropping
const RAD = Math.PI / 180;

const HANGERS: {
    icon: LucideIcon;
    left: number;
    top: number;
    length: number;
    amp: number;
    duration: number;
}[] = [
    { icon: Database, left: 10, top: 40, length: 120, amp: 5, duration: 3.6 },
    { icon: Code, left: 26, top: 0, length: 240, amp: 4, duration: 4.8 },
    { icon: Server, left: 42, top: 48, length: 120, amp: 6, duration: 4.1 },
    { icon: PenTool, left: 58, top: 12, length: 240, amp: 3.5, duration: 5.4 },
    { icon: Workflow, left: 74, top: 40, length: 100, amp: 5.5, duration: 3.9 },
    {
        icon: PanelsTopLeft,
        left: 90,
        top: 8,
        length: 180,
        amp: 4.5,
        duration: 5,
    },
];

// Shared between icons so a dragged icon can find and hit the others
type Handle = {
    getCenter: () => { x: number; y: number };
    kick: (impulse: number) => void;
};
type Registry = Map<number, Handle>;

function HangingIcon({
    icon: Icon,
    left,
    top,
    length,
    amp,
    duration,
    index,
    inView,
    reduceMotion,
    registry,
    containerRef,
    areaWidth,
}: {
    icon: LucideIcon;
    left: number;
    top: number;
    length: number;
    amp: number;
    duration: number;
    index: number;
    inView: boolean;
    reduceMotion: boolean;
    registry: { current: Registry };
    containerRef: { current: HTMLDivElement | null };
    areaWidth: number;
}) {
    const [dragging, setDragging] = useState(false);
    const [ready, setReady] = useState(false);

    // Which icons the dragged one is currently touching (so each hit fires once)
    const overlaps = useRef<Set<number>>(new Set());
    const hitAnim = useRef<ReturnType<typeof animate> | null>(null);

    // Drag offset
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Entrance: drop (0 -> 1 string payout) and an extra swing that decays to 0
    const drop = useMotionValue(reduceMotion ? 1 : 0);
    const entry = useMotionValue(reduceMotion ? 0 : index % 2 ? 20 : -20);

    // Idle swing, faded in after the entrance
    const angle = useMotionValue(-amp);
    const gain = useMotionValue(0);

    // Swing angle (deg) added when another icon hits this one
    const hit = useMotionValue(0);

    // Entrance
    useEffect(() => {
        if (!inView) return;
        if (reduceMotion) {
            drop.set(1);
            setReady(true);
            return;
        }
        const delay = index * STAGGER;
        const dropAnim = animate(drop, 1, {
            type: "spring",
            stiffness: 45,
            damping: 9,
            mass: 1,
            delay,
        });
        const swingAnim = animate(entry, 0, {
            type: "spring",
            stiffness: 18,
            damping: 3,
            mass: 1,
            delay: delay + 0.25,
        });
        const idleAnim = animate(gain, 1, {
            duration: 2.5,
            delay: delay + 2.2,
            ease: "easeInOut",
        });
        const readyTimer = setTimeout(() => setReady(true), (delay + 1) * 1000);

        return () => {
            dropAnim.stop();
            swingAnim.stop();
            idleAnim.stop();
            clearTimeout(readyTimer);
        };
    }, [inView, reduceMotion, index, drop, entry, gain]);

    // Idle swing loop
    useEffect(() => {
        if (reduceMotion) return;
        const controls = animate(angle, amp, {
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
        });
        return () => controls.stop();
    }, [angle, amp, duration, reduceMotion]);

    // Current string length grows as it drops
    const curLen = useTransform(drop, (d) => length * d);

    // Total swing angle = idle swing + entrance swing + hit swing
    const swingDeg = useTransform(
        [angle, gain, entry, hit],
        ([a, g, e, h]) =>
            (a as number) * (g as number) + (e as number) + (h as number),
    );

    // Position along the arc the icon travels on (relative to the anchor)
    const swingX = useTransform(
        [swingDeg, curLen],
        ([d, l]) => (l as number) * Math.sin((d as number) * RAD),
    );
    const posY = useTransform(
        [swingDeg, curLen],
        ([d, l]) => (l as number) * Math.cos((d as number) * RAD),
    );

    // The drag layer sits inside the rotated swing layer, so rotate its offset
    const offX = useTransform([x, y, swingDeg], ([a, b, d]) => {
        const r = (d as number) * RAD;
        return (a as number) * Math.cos(r) - (b as number) * Math.sin(r);
    });
    const offY = useTransform([x, y, swingDeg], ([a, b, d]) => {
        const r = (d as number) * RAD;
        return (a as number) * Math.sin(r) + (b as number) * Math.cos(r);
    });

    // String end = icon center (relative to the anchor)
    const lineX2 = useTransform(
        [offX, swingX],
        ([a, b]) => (a as number) + (b as number),
    );
    const lineY2 = useTransform(
        [offY, posY],
        ([a, b]) => (a as number) + (b as number),
    );

    // Extra tilt from dragging sideways
    const dragTilt = useTransform(x, [-160, 160], [-22, 22]);

    // Fade in as it leaves the anchor
    const opacity = useTransform(drop, [0, 0.08], [0, 1]);

    // Pull range, measured from this icon's own anchor
    const anchorX = (areaWidth * left) / 100;
    const constraints = {
        left: -anchorX + ICON_SIZE / 2,
        right: areaWidth - anchorX - ICON_SIZE / 2,
        top: -(length - 24),
        bottom: AREA_HEIGHT - top - length - ICON_SIZE / 2 + PULL_BELOW,
    };

    // Register so other icons can hit this one
    useEffect(() => {
        const handle: Handle = {
            getCenter: () => {
                const w = containerRef.current?.offsetWidth ?? 0;
                return {
                    x: (w * left) / 100 + offX.get() + swingX.get(),
                    y: top + offY.get() + posY.get(),
                };
            },
            kick: (impulse) => {
                if (reduceMotion || drop.get() < 0.9) return;
                hitAnim.current?.stop();
                const velocity = Math.max(
                    -160,
                    Math.min(160, hit.getVelocity() + impulse),
                );
                hitAnim.current = animate(hit, 0, {
                    type: "spring",
                    stiffness: 14,
                    damping: 2.2,
                    mass: 1,
                    velocity,
                });
            },
        };
        registry.current.set(index, handle);
        const map = registry.current;
        return () => {
            map.delete(index);
        };
    }, [
        index,
        left,
        top,
        reduceMotion,
        registry,
        containerRef,
        offX,
        offY,
        swingX,
        posY,
        drop,
        hit,
    ]);

    const handleDragStart = () => {
        setDragging(true);
        overlaps.current.clear();
        hitAnim.current?.stop();
        animate(hit, 0, { duration: 0.6, ease: "easeOut" });
        animate(gain, 0, { duration: 0.6, ease: "easeOut" });
    };

    const handleDrag = (_: unknown, info: PanInfo) => {
        const me = registry.current.get(index)?.getCenter();
        if (!me) return;
        const speed = Math.hypot(info.velocity.x, info.velocity.y);

        registry.current.forEach((other, i) => {
            if (i === index) return;
            const c = other.getCenter();
            const dx = c.x - me.x;
            const dy = c.y - me.y;
            const dist = Math.hypot(dx, dy);

            if (dist < ICON_SIZE && !overlaps.current.has(i)) {
                overlaps.current.add(i);
                // Push away from the dragged icon; harder hits swing wider
                const dir =
                    Math.abs(dx) > 1
                        ? Math.sign(dx)
                        : Math.sign(info.velocity.x) || 1;
                other.kick(dir * Math.min(120, 40 + speed / 18));
            } else if (dist > ICON_SIZE + 8) {
                overlaps.current.delete(i);
            }
        });
    };

    const handleDragEnd = () => {
        setDragging(false);
        overlaps.current.clear();
        const spring = reduceMotion
            ? { type: "spring" as const, stiffness: 300, damping: 40 }
            : { type: "spring" as const, stiffness: 40, damping: 7, mass: 1.2 };
        animate(x, 0, spring);
        animate(y, 0, spring);
        if (!reduceMotion) {
            animate(gain, 1, { duration: 2, delay: 1.2, ease: "easeInOut" });
        }
    };

    return (
        <div className="absolute h-0 w-0" style={{ left: `${left}%`, top }}>
            {/* String */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 overflow-visible"
                width="1"
                height="1"
            >
                <motion.line
                    x1={0}
                    y1={0}
                    x2={lineX2}
                    y2={lineY2}
                    stroke="currentColor"
                    strokeDasharray="2 2"
                    strokeOpacity={0.5}
                    strokeWidth={1}
                    style={{ opacity }}
                />
            </svg>

            {/* Pin */}
            <span
                aria-hidden="true"
                className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary-foreground"
            />

            {/* Swing layer: rides the arc and rotates with the string */}
            <motion.div
                aria-hidden="true"
                className={dragging ? "absolute z-40" : "absolute z-30"}
                style={{
                    x: swingX,
                    y: posY,
                    rotate: swingDeg,
                    opacity,
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    left: -ICON_SIZE / 2,
                    top: -ICON_SIZE / 2,
                    pointerEvents: ready ? "auto" : "none",
                }}
            >
                {/* Drag layer */}
                <motion.div
                    drag={ready}
                    dragConstraints={constraints}
                    dragElastic={0.35}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ x, y, rotate: dragTilt }}
                    className="flex h-full w-full cursor-grab touch-none select-none items-center justify-center rounded bg-primary border border-dashed active:cursor-grabbing"
                >
                    <Icon className="h-5 w-5 text-primary-foreground" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function CTA() {
    const reduceMotion = !!useReducedMotion();
    const hangRef = useRef<HTMLDivElement>(null);
    const registry = useRef<Registry>(new Map());
    const inView = useInView(hangRef, { once: true, amount: 0.5 });
    const [areaWidth, setAreaWidth] = useState(320);

    useEffect(() => {
        const el = hangRef.current;
        if (!el) return;
        setAreaWidth(el.offsetWidth);
        const ro = new ResizeObserver(([entry]) =>
            setAreaWidth(entry.contentRect.width),
        );
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <section
            aria-labelledby="cta-heading"
            className="relative w-full md:px-4 flex items-center justify-center"
        >
            <Card className="max-w-7xal relative grid gap-8 overflow-hidden rounded-none border-none bg-primary p-4 py-8 text-primary-foreground md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-12 md:rounded md:p-8 md:py-16">
                <GradientDotGrid
                    className="z-10"
                    color="--primary-foreground"
                />
                <DotSprayTexture
                    className="absolute inset-0 z-10 pointer-events-none hidden md:block"
                    activeColor="--primary-foreground"
                />

                {/* Text */}
                <div className="relative z-20 flex flex-col items-start gap-4">
                    <h2
                        id="cta-heading"
                        className="text-4xl font-light capitalize leading-tight tracking-tight md:text-6xl"
                    >
                        {"Let's"} build something without boundaries
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed text-primary-foreground/80">
                        Every great project starts with a conversation — reach
                        out and {"let's"} talk through what {"you're"} building.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/80"
                    >
                        <Link href="#contact">
                            Get in touch
                            <ArrowUpRight size={14} />
                        </Link>
                    </Button>
                </div>

                {/* Hanging icons */}
                <div
                    ref={hangRef}
                    className="relative z-20 w-full text-primary-foreground  hidden md:block"
                    style={{ height: AREA_HEIGHT }}
                >
                    {HANGERS.map((hanger, i) => (
                        <HangingIcon
                            key={hanger.left}
                            {...hanger}
                            index={i}
                            inView={inView}
                            reduceMotion={reduceMotion}
                            registry={registry}
                            containerRef={hangRef}
                            areaWidth={areaWidth}
                        />
                    ))}
                </div>
            </Card>
        </section>
    );
}
