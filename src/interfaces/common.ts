export interface IFileDetails {
    file_id: string;
    filename: string;
    file_size: number;
}

export interface IOcrTask {
    ocr_task_id: string;
    input_file: IFileDetails;
    output_file: IFileDetails;
    status: string;
    created_at: string;
    execution_time: number;
}

export interface AxiosError {
    message: string;
    name: string;
    stack: string;
    config: any;
    code: string;
    status: number;
}