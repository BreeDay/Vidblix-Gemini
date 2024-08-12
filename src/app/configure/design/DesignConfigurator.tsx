"use client";

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { RadioGroup } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";
import {
  Text,
  Html,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { TextBox } from "@components/us/textbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  Mic,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig, SaveConfigArgs } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
}

const DesignConfigurator = ({
  configId,
  imageUrl,
}: DesignConfiguratorProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([_saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
  });

  const VBmodel = useGLTF(`${imageUrl}`);

  const containerRef = useRef<HTMLDivElement>(null);

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
  const [blixName, setBlixName] = useState("");
  const [blixDescr, setBlixDescr] = useState("");
  const [zoom, setZoom] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [blixText, setBlixText] = useState("");
  const [askMore, setAskMore] = useState("");
  const [rotation, setRotation] = useState(0);
  useEffect(() => {}, []);

  const [blixSize, setBlixSize] = useState(0);
  useEffect(() => {}, []);

  const handleSynthesize = async () => {
    console.log(blixText);
    const ttsresponse = await axios.post("http://localhost:3001/synthesize", {
      blixText,
    });
    const resAudioSrc = `data:audio/mp3;base64,${ttsresponse.data.audioContent}`;
    setAudioSrc(resAudioSrc);
  };
  const getResponse = async () => {
    try {
      const message = `Generate a description for a product called ${blixName} which can be described as ${blixDescr}. Limit the response to 15 words`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setBlixText(data);
      setRotation(2.9);
    } catch (error) {
      console.log(error);
    }
  };
  const getReResponse = async () => {
    try {
      const message = `Answer this question ${askMore} using info from ${blixName} and ${blixDescr}. Limit the response to 15 words`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setBlixText(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-400"
      >
        <div className="search-result">
          <div key={""}>
            <p className="answer"></p>
          </div>
        </div>
        <Canvas>
          <Environment preset="city" />

          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-5, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Float rotationIntensity={rotation}>
              <rectAreaLight
                width={2.5}
                height={5.65}
                intensity={65}
                // color={"#ff6900"}
                rotation={[-0.1, Math.PI, 0]}
                position={[0, 0.55, -1.15]}
              />

              <primitive
                object={VBmodel.scene}
                position={[0, -1.2, -0.4]}
                scale={blixSize ? blixSize : 0.75}
                rotation-x={0.13}
              ></primitive>
            </Float>
          </PresentationControls>
        </Canvas>
        <div>
          <Button
            onClick={() => setBlixSize(blixSize ? blixSize + 0.1 : 0.85)}
            className="w-auto"
          >
            <ZoomIn className="w-4 h-4 inline" />
          </Button>
          <Button
            onClick={() => setBlixSize(blixSize ? blixSize - 0.1 : 0.65)}
            className="w-auto"
          >
            <ZoomOut className="h-4 w-4 inline" />
          </Button>
        </div>

        <div className="bottom-12 left-0 right-0 text-center absolute">
          {blixText && blixText}
          {/* {blixText && (
            <Button onClick={handleSynthesize} className="w-auto">
              <Mic className="w-4 h-4 inline" />
            </Button>
          )}
          <br />
          {audioSrc && <audio controls src={audioSrc} />} */}
        </div>
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Generate Your Blix
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <Label>Blix Name:</Label>
                <input
                  name="blixName"
                  type="text"
                  value={blixName}
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Blix Name"
                  onChange={(e) => setBlixName(e.target.value)}
                />

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Category</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Label>Description:</Label>
                <input
                  name="blixDescr"
                  value={blixDescr}
                  type="text"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  onChange={(e) => setBlixDescr(e.target.value)}
                  placeholder="Description of Blix"
                />
                <Label>Youtube:</Label>
                <input
                  name="blixYT"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Relevant Youtube Video"
                />
                <Label>Website:</Label>
                <input
                  name="blixWeb"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Website Related to Blix"
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />

          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              {/* <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p> */}
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={getResponse}
                className="w-full"
              >
                Generate
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {blixText && (
        <div className="relative mt-4 h-full flex flex-col justify-between">
          <Label>Test Blix As User:</Label>
          <input
            name="askMore"
            type="text"
            value={askMore}
            required
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Ask This Blix Questions"
            onChange={(e) => setAskMore(e.target.value)}
          />
          <Button
            isLoading={isPending}
            disabled={isPending}
            loadingText="Saving"
            onClick={getReResponse}
            className="w-full"
          >
            Test Blix
            <ArrowRight className="h-4 w-4 ml-1.5 inline" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesignConfigurator;
