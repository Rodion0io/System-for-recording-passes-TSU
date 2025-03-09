import { FilterModel } from "../@types/api"

export const createUrl = (model: FilterModel | string, userId?: string) => {
    let result = userId ? userId + "?" : "?";

    if (typeof(model) === "string"){
        result += model;
    }
    else{
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
    
    return result;
    
}