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

export interface ILocation {
    id: number;
    name: string;
    lat: number;
    long: number;
    category: string;
    wheelchair_access: boolean;
    accessible_toilet: boolean;
    disabled_parking: boolean;
    braille_signs: boolean;
    induction_loops: boolean;
    visual_audio_signals: boolean;
    lowered_counters: boolean;
    assistance_service: boolean;
    guide_paths: boolean;
    elevator: boolean;
    seating_with_armrests: boolean;
    hearing_access: 'full' | 'partial' | 'no_access';
    wheelchair_access_level: 'full' | 'partial' | 'no_access';
    vision_access_level: 'full' | 'partial' | 'no_access';
    cognitive_access_level: 'full' | 'partial' | 'no_access';
}
