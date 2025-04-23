  export interface ReservationPredictionDTO {
      client_age: number;
      past_cancellations: number;
      client_cancellation_rate: number;
      client_avg_stay_length: number;
      hotel_type: 'motel' | 'hostel' | 'airbnb' | 'hotel' | 'other';
      hotel_country_region: 'Colombia';
      hotel_cancellation_rate: number;
      room_price: number;
      room_capacity: number;
      price_ratio_to_avg: number;
      stay_duration: number;
      booking_lead_time_category: 'advanced' | 'short_notice' | 'last_minute';
      checkin_day_of_week: number;
      is_weekend_checkin: number;
      is_high_season: number;
      concurrent_confirmed_reservations: number;
      concurrent_confirmation_rate: number;
      payment_status_category: 'no_payment' | 'paid';
      payment_method: string;
    }
    
    export interface WekaResponseDTO {
      prediction: string;
      probabilities: { [key: string]: number };
    }