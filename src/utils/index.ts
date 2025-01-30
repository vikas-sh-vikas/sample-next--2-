/**
 * Index.ts
 * This Component is used to write common function to used them throughout the project..
 */

// import html2canvas from "html2canvas";
import { DEFAULT_THEME_VARIABLES } from "@/utils/constants";
import { ScreenUtil } from "@/utils/screen";

declare const document: any;
declare const Element: any;

export default class Utils {
  static flattenTagMasterList = (inputArray: any[]) => {
    let resultArray: any[] = [];
    let tagLabelNameSet = new Set();

    const flatten = (tag: any, parentGroupName: string | null = null) => {
      // Determine the effective groupName for the tag, using parentGroupName if present
      const effectiveGroupName = tag.groupName || parentGroupName;

      // Check if isTag is true or false
      if (tag?.isTag || !tag?.isTag) {
        // If isTag is true, check for combination of tagLabel and labelName duplicacy
        if (
          tag?.isTag &&
          !tagLabelNameSet.has(
            `${effectiveGroupName}-${tag?.tagLabel}-${tag?.labelName}-${tag?.tagFooter}`
          )
        ) {
          // Add the combination of tagLabel and labelName to the set
          tagLabelNameSet.add(
            `${effectiveGroupName}-${tag.tagLabel}-${tag.labelName}-${tag?.tagFooter}`
          );

          // Push the current tag to the result array
          resultArray.push({ ...tag, groupName: effectiveGroupName });
        } else if (!tag.isTag) {
          // If isTag is false, push the tag directly
          resultArray.push({ ...tag, groupName: effectiveGroupName });
        }

        // If the tag has a tagMasterList, recursively flatten it
        if (tag.tagMasterList && Array.isArray(tag.tagMasterList)) {
          tag.tagMasterList.forEach((nestedTag: any) => {
            flatten(
              { ...nestedTag, isLabel: true, labelName: tag.tagLabel },
              effectiveGroupName
            );
          });
        }
      }
    };

    // Iterate over each tag in the input array and flatten it
    inputArray.forEach(flatten as any);

    return resultArray;
  };

  // static flattenTagMasterList = (inputArray: any[]) => {
  //   let resultArray: any[] = [];
  //   let tagLabelNameSet = new Set();

  //   const flatten = (tag: any) => {
  //     // Check if isTag is true or false
  //     if (tag?.isTag || !tag?.isTag) {
  //       // If isTag is true, check for combination of tagLabel and labelName duplicacy
  //       if (
  //         tag?.isTag &&
  //         !tagLabelNameSet.has(`${tag?.groupName}-${tag?.tagLabel}-${tag?.labelName}-${tag?.tagFooter}`)
  //       ) {
  //         // Add the combination of tagLabel and labelName to the set
  //         tagLabelNameSet.add(`${tag?.groupName}-${tag.tagLabel}-${tag.labelName}-${tag?.tagFooter}`);

  //         // Push the current tag to the result array
  //         resultArray.push(tag);
  //       } else if (!tag.isTag) {
  //         // If isTag is false, push the tag directly
  //         resultArray.push(tag);
  //       }

  //       // If the tag has a tagMasterList, recursively flatten it
  //       if (tag.tagMasterList && Array.isArray(tag.tagMasterList)) {
  //         tag.tagMasterList.forEach((nestedTag: any) => {
  //           flatten({ ...nestedTag, isLabel: true, labelName: tag.tagLabel });
  //         });
  //       }
  //     }
  //   };

  //   // Iterate over each tag in the input array and flatten it
  //   inputArray.forEach(flatten);

  //   return resultArray;
  // };

  static mapObjectToDropdownOptions(
    data: Array<any> = [],
    { key, value, label }: TDropdownOption = {
      value: "id",
      label: "id",
    }
  ) {
    return data.map((d, index) => ({
      key: index,
      value: d[value],
      label: d[label],
      data: d,
    }));
  }

  //   // fullscreen mode
  static upFullScreen() {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
  }

  //   // close fullscreen mode
  static downFullScreen() {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  /**
   * is null or undefined
   * @param value
   * @returns
   */
  static isNullOrUndefined = (value: any) => [null, undefined].includes(value);

  static deepClone = (value: any = {}) => JSON.parse(JSON.stringify(value));
  static applyThemeColor(theme: any, vars = DEFAULT_THEME_VARIABLES) {
    if (theme) {
      for (let prop of vars) {
        document.documentElement.style.setProperty(`--${prop}`, theme[prop]);
      }
    }
  }

  static getBase64FromByteString = (bytesInString: string = "") => {
    return `data:image/png;base64,${bytesInString}`;
  };

  static getFloatValue = (value: any) =>
    typeof value == "number"
      ? value
      : isNaN(parseFloat(value))
      ? 0
      : parseFloat(value);

  static toUpper = (value: any) =>
    value && typeof value == "string" ? value.toUpperCase() : "";

  static scrollToTop = (top: number = document.documentElement.scrollHeight) =>
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

  static toggleScreen = () => {
    ScreenUtil.isFullScreen() ? Utils.downFullScreen() : Utils.upFullScreen();
  };

  static async getScreenShot(
    elementId: string,
    scale: number = 0.5,
    quality: number = 0.5
  ) {
    try {
      if (elementId) {
        var shareContent = document.querySelector(elementId) as HTMLElement; // need screenshots of the package （ the native ）DOM  object
        // var shareContent = document.getElementsByClassName('page-1')[0];
        var width = shareContent.offsetWidth * scale; // get the dom width
        var height = shareContent.offsetHeight * scale; // get the dom height

        var canvas = document.createElement("canvas"); // create a canvas node

        canvas.width = width * scale; // define canvas width  *  the zoom
        canvas.height = height * scale; // define canvas height  * the zoom
        canvas.getContext("2d").scale(scale, scale); // get the context, set scale

        var opts: any = {
          scale, //  the added scale parameter
          canvas, // the custom canvas
          logging: true, // the log switch
          width: width * 2, //dom  the original width
          height: height * 2, //dom  original height
          allowTaint: true,
          backgroundColor: "#f3f3f3",
          html2canvas: {},
          useCORS: true,
        };
        // const canvasImage = await html2canvas(shareContent, opts);
        // return canvasImage.toDataURL("image/jpeg", quality);
      } else {
        return {
          error: "Please provide element to capture",
        };
      }
    } catch (error) {
      console.error(`Error ! while capturing screen shoot error ${error}`);
      return {
        error: "Error ! while capturing screen shoot",
      };
    }
  }

  static splittedBase64String = (value: string) => {
    if (!value) {
      return {
        error: "Please provide image base 64 string",
      };
    }
    return /,(.+)/.exec(value)?.[1];
  };

  static preventDefault = (event: any = {}) => {
    event?.preventDefault();
    event?.stopPropagation();
    return false;
  };

  static redirectUrl = (path: string) => {
    window.location.href = path;
  };

  static isFalsy = (value: any) =>
    [undefined, null, "", 0, false].includes(value);

  static sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  static generateIntRandomBetweenMinMax = (
    min: number = 0,
    max: number = 100
  ) => Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * Query string
   * @param q params
   * @returns
   */
  static getQueryString = (q: any = {}) => {
    const qParams = Object.keys(q).filter(
      (param) => ![null, undefined].includes(q[param])
    );
    return qParams.length
      ? "?" +
          qParams
            .map(
              (param) =>
                `${encodeURIComponent(param)}=${encodeURIComponent(q[param])}`
            )
            .join("&")
      : "";
  };
  static SUCCESS: any;

  static prepareTree(
    data: Array<any> = [],
    parentId = "parentId",
    childrenId = "children"
  ): Array<any> | Object {
    let root: any;
    const idMapping = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    // Deep copy the input data to avoid modifying the original data
    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy.forEach((el: any) => {
      if (!el[parentId]) {
        root = el;
        return;
      }
      // Use our mapping to locate the parent element in our copied data array
      const parentEl = dataCopy[idMapping[el[parentId]]];
      // Add our current el to its parent's `children` array
      parentEl[childrenId] = [...(parentEl[childrenId] || []), el];
    });
    return root;
  }

  static mapAdditionalOption(
    options: { value: number; label: string }[],
    selectedOption?: { value: number; label: string }
  ) {
    if (selectedOption) {
      const foundOption = options.find(
        (option) => option?.value === selectedOption?.value
      );
      return foundOption ? options : options.unshift(selectedOption);
    }
  }

  static isUserHasAccess(
    privilegeList: TCheckPrevilege[],
    componentUniuqId: string
  ): boolean {
    const userPrivilegeId = privilegeList?.find(
      (items: TCheckPrevilege) => items.privilegeUniqueId === componentUniuqId
    );

    if (userPrivilegeId) {
      return true;
    }
    return false;
  }
}
