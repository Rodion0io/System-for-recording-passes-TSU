import { useState, useEffect } from "react";

import { ExportDatas, selectedValue } from "../../../../@types/api";
import { createUrl } from "../../../../utils/createUrl";
import { exportDatasFile } from "../../../../utils/api/export";

export const useExport = () => {

    const token = localStorage.getItem('token');

    const [exportDatas, setExportDatas] = useState<ExportDatas>({targetUsersId: [], dateFrom: "", dateTo: ""});
    const [exports, setExports] = useState<selectedValue[]>([]);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);

    const handleExportChange = (field: string, value: string | selectedValue[], name: string) => {
        if (typeof value === "string" && name === "export"){
            setExportDatas((prevState) => (
                {...prevState, [field]: field === "dateFrom" || field === "dateTo" ? new Date(value).toISOString() : value}
            ))
        }
        else{
            setExports(value);
        }
    }

    useEffect(() => {
        const usersList: string[] = exports.map((item) => item.id);
        setExportDatas((prev) => ({
            ...prev, ["targetUsersId"]: usersList
        }))
    },[exports]);

    const handleExport = async () => {
        if (exportDatas.dateFrom > exportDatas.dateTo){
            setErrorFlag(true);
            setErrorStatusCode(8);
        }
        else{
            try {
                if (token){
                    setErrorFlag(false);
                    setErrorStatusCode(0);
                    const urlPattern = createUrl(exportDatas);
                    if (urlPattern){
                        const response = await exportDatasFile(token, urlPattern);
            
                        if (response.status !== 200) {
                            throw new Error(`Ошибка при экспорте: ${response.status}`);
                        }
                
                        // 🔹 Берем бинарные данные напрямую
                        const blob = response.data;
                
                        // Создаем ссылку и скачиваем файл
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "exported_data.docx"; // Название файла
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                    }
                }
            } catch (error) {
                console.error("Ошибка при скачивании файла:", error);
            }
        }
    };

    return { errorFlag, errorStatusCode, handleExportChange, handleExport };
}