import $api from "../http";
import {IOcrTask} from "../interfaces/common";



export default class OcrService {
    static async getOcrs(): Promise<IOcrTask[]> {
        return $api.get<IOcrTask[]>('/ocr').then(response => response.data);
    }

    static async createOcr(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return $api.post(
            `/ocr`,
            formData,
            {
                headers: {"Content-Type": "multipart/form-data"}
            })
    }

    static async cancelOcr(taskId: string) {
        return $api.post(`/ocr/${taskId}/cancel`)
    }

    static async deleteOcr(taskId: string) {
        return $api.delete(`/ocr/${taskId}`)
    }

    static async getFile(fileId: string) {
        return $api.get(`/file/${fileId}`)
    }

    static async downloadFile(fileId: string) {
        const response = await $api.get(`/file/${fileId}`, {
            responseType: 'blob',
        });
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

}
