import { ExportDatas, FilterModel } from "../@types/api"

export const createUrl = (model: FilterModel | string | ExportDatas, userId?: string, fieldValue?: string) => {
    let result = userId ? userId + "?" : "?";

    if (typeof(model) === "string" && fieldValue){
        result += `${fieldValue}=${model}`
        return result
    }
    else{
      let modelValues = Object.entries(model);

      for(let i = 0; i < modelValues.length; i++){

        if (Array.isArray(modelValues[i][1]) && modelValues[i][1].length > 1){
          modelValues[i][1][0] = `${modelValues[i][0]}=${modelValues[i][1][0]}&`;
          let part = modelValues[i][1].join(`${modelValues[i][0]}=`) + "&";
          result += part;
          part = "";
        }

        else if (modelValues[i][1] !== ""){
          let partUrl = modelValues[i].join("=") + "&";
          result += partUrl;
          partUrl = "";
        }
        
      }
      return result.slice(0,-1);
    }
    
    return null;
    
}