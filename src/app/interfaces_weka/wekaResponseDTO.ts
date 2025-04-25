  
    export interface WekaResponseDTO {
      client_id: number;
      prediction: string;
      probabilities: { [key: string]: number };
    }