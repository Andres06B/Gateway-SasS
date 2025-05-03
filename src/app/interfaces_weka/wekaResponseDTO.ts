  
    export interface WekaResponseDTO {
      reservation_id: number;
      client_id: number;
      prediction: string;
      probabilities: { [key: string]: number };
    }