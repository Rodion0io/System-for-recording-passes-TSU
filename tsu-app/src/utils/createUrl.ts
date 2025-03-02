import { FilterModel } from "../@types/api"

export const createUrl = (model: FilterModel, userId?: string) => {
    let result = userId ? userId + "?" : "?";

    let modelValues = Object.entries(model);

    for(let i = 0; i < modelValues.length; i++){
      if (modelValues[i][1] !== ""){
          let partUrl = modelValues[i].join("=") + "&";
        result += partUrl;
        partUrl = "";
      }
    }

    return result.slice(0,-1);
}