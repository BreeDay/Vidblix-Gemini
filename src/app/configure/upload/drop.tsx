import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { Viewer } from "./viewer.js";
import { SimpleDropzone } from "simple-dropzone";
import { Validator } from "./validator.js";
import queryString from "query-string";

declare global {
  interface Window {
    VIEWER: any;
  }
}

window.VIEWER = {};
const Drop: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const validatorRef = useRef<Validator | null>(null);
  useEffect(() => {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      console.error("The File APIs are not fully supported in this browser.");
    } else if (!WebGL.isWebGLAvailable()) {
      console.error("WebGL is not supported in this browser.");
    }

    const el = appRef.current;
    if (!el) return;

    const location = window.location;
    const hash = location.hash ? queryString.parse(location.hash) : {};
    const options = {
      kiosk: Boolean(hash.kiosk),
      model: hash.model || "",
      preset: hash.preset || "",
      cameraPosition: hash.cameraPosition
        ? (hash.cameraPosition as string).split(",").map(Number)
        : null,
    };

    const validator = new Validator(el);
    validatorRef.current = validator;

    createDropzone();

    if (options.kiosk) {
      const headerEl = document.querySelector("header");
      if (headerEl) headerEl.style.display = "none";
    }

    if (options.model) {
      view(options.model, "", new Map());
    }

    window.VIEWER.app = {
      view,
      load,
    };

    console.info("[glTF Viewer] Debugging data exported as `window.VIEWER`.");

    function createDropzone() {
      const dropEl = dropzoneRef.current;
      const inputEl = inputRef.current;
      if (!dropEl || !inputEl) return;

      const dropCtrl = new SimpleDropzone(dropEl, inputEl);
      dropCtrl.on("drop", ({ files }) => load(files));
      dropCtrl.on("dropstart", showSpinner);
      dropCtrl.on("droperror", hideSpinner);
    }

    function createViewer() {
      const viewerEl = document.createElement("div");
      viewerEl.classList.add("viewer");
      const dropEl = dropzoneRef.current;
      if (!dropEl) return;

      dropEl.innerHTML = "";
      dropEl.appendChild(viewerEl);
      const viewer = new Viewer(viewerEl, options);
      viewerRef.current = viewer;
      return viewer;
    }

    function load(fileMap: Map<string, File>) {
      let rootFile: File | undefined;
      let rootPath: string | undefined;

      Array.from(fileMap).forEach(([path, file]) => {
        if (file.name.match(/\.(gltf|glb)$/)) {
          rootFile = file;
          rootPath = path.replace(file.name, "");
        }
      });

      if (!rootFile) {
        onError(new Error("No .gltf or .glb asset found."));
        return;
      }

      view(rootFile, rootPath, fileMap);
    }

    function view(
      rootFile: File | string,
      rootPath: string,
      fileMap: Map<string, File>
    ) {
      if (viewerRef.current) viewerRef.current.clear();

      const viewer = viewerRef.current || createViewer();
      if (!viewer) return;

      const fileURL =
        typeof rootFile === "string" ? rootFile : URL.createObjectURL(rootFile);

      const cleanup = () => {
        hideSpinner();
        if (typeof rootFile === "object") URL.revokeObjectURL(fileURL);
      };

      viewer
        .load(fileURL, rootPath, fileMap)
        .catch((e) => onError(e))
        .then((gltf) => {
          if (!options.kiosk) {
            validatorRef.current?.validate(fileURL, rootPath, fileMap, gltf);
          }
          cleanup();
        });
    }

    function onError(error: any) {
      let message = (error || {}).message || error.toString();
      if (message.match(/ProgressEvent/)) {
        message =
          "Unable to retrieve this file. Check JS console and browser network tab.";
      } else if (message.match(/Unexpected token/)) {
        message = `Unable to parse file content. Verify that this file is valid. Error: "${message}"`;
      } else if (error && error.target && error.target instanceof Image) {
        message = "Missing texture: " + error.target.src.split("/").pop();
      }
      window.alert(message);
      console.error(error);
    }

    function showSpinner() {
      if (spinnerRef.current) {
        spinnerRef.current.style.display = "";
      }
    }

    function hideSpinner() {
      if (spinnerRef.current) {
        spinnerRef.current.style.display = "none";
      }
    }
  }, []);
  return (
    <div ref={appRef}>
      <div ref={spinnerRef} className="spinner" />
      <div ref={dropzoneRef} className="dropzone">
        <input ref={inputRef} id="file-input" type="file" />
      </div>
    </div>
  );
};

export default Drop;
