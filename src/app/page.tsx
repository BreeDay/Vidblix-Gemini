"use client";

import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Component, Check, LucideIcon } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import infoCards from "@/lib/infocards";
import { ReactElement } from "react";
import Computer from "../components/Computer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Generate <br />
                <span className="bg-orange-400 px-2 text-white">
                  AI Animations
                </span>{" "}
                <br />
                In Minutes!
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Create Custom Animations With{" "}
                <span className="font-semibold">3D Model Ineractions</span> For
                Education & Entertainment Purposes.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Component className="h-5 w-5 shrink-0 text-orange-400" />
                    Market and Advertize Products
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Component className="h-5 w-5 shrink-0 text-orange-400" />
                    Visual and Interactive Learning
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Component className="h-5 w-5 shrink-0 text-orange-400" />
                    Animate Characters for Shows
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Canvas
                className="r3f"
                camera={{
                  fov: 45,
                  near: 0.1,
                  far: 2000,
                  position: [-0.5, 1.5, 4],
                }}
              >
                <Computer />
              </Canvas>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 grainy-dark py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              How{" "}
              <span className="bg-orange-400 px-2 text-white">
                Vid<span className="text-black">blix</span>
              </span>{" "}
              Works
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 justify-between relative">
            {infoCards.map((infoCard) => {
              return (
                <InfoCard
                  key={infoCard.id}
                  Icon={infoCard.icon}
                  title={infoCard.title}
                >
                  <p className="text-sm sm:text-base text-center md:text-left">
                    {infoCard.bodyText}
                  </p>
                </InfoCard>
              );
            })}
          </div>
        </MaxWidthWrapper>

        {/* <div className="pt-16">
          <Reviews />
        </div> */}
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload and Share Your{" "}
                <span className="relative px-2 bg-orange-400 text-white">
                  Blix
                </span>{" "}
                now!
              </h2>
            </div>
          </div>

          {/* <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                />
              </div>

            </div>
          </div> */}

          {/* <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-400 inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-400 inline mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-400 inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-400 inline mr-1.5" />5 year
              print warranty
            </li> */}

          <div className="flex justify-center">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "mx-auto mt-8",
              })}
              href="/configure/upload"
            >
              Lets Go! <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
          {/* </ul> */}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

interface IInfoCardProps {
  title: string;
  Icon: LucideIcon;
  children: ReactElement<any, any>;
}

function InfoCard({ title, Icon, children }: IInfoCardProps) {
  return (
    <div className="w-full h-80 rounded flex flex-col justify-around items-center p-8 bg-gray-900 rounded bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20">
      <div className="p-4 bg-orange-400 rounded-full">
        <Icon />
      </div>
      <div>
        <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
