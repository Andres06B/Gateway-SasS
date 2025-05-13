import { Component } from '@angular/core';

@Component({
  selector: 'app-asistente-qu',
  standalone: false,
  templateUrl: './asistente-qu.component.html',
  styleUrl: './asistente-qu.component.css'
})
export class AsistenteQuComponent {
isOpen = false;
  userInput = '';
  messages: {text: string, sender: 'user' | 'assistant', loading?: boolean}[] = [];
  showSuggestedQuestions = true;
  
  suggestedQuestions = [
    "¿Qué tipos de alojamiento ofrecen?",
    "¿Cómo funciona el sistema de reservas?",
    "¿Tienen opciones ecológicas?",
    "¿Qué destinos en Colombia recomiendan?"
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.showWelcomeMessage();
    }
  }

  showWelcomeMessage() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de Quantum Gateway. ¿En qué puedo ayudarte con tus reservas hoy?',
      sender: 'assistant'
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    
    const userMessage = this.userInput;
    this.messages.push({
      text: userMessage,
      sender: 'user'
    });
    this.userInput = '';
    this.showSuggestedQuestions = false;
    
    // Simular respuesta del asistente
    this.messages.push({
      text: '',
      sender: 'assistant',
      loading: true
    });
    
    setTimeout(() => {
      this.messages.pop(); // Eliminar el mensaje de carga
      this.messages.push({
        text: this.getResponseForMessage(userMessage),
        sender: 'assistant'
      });
    }, 1000);
  }

  sendSuggestedQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  getResponseForMessage(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('alojamiento') || lowerMessage.includes('hotel') || lowerMessage.includes('cabaña')) {
      return "Ofrecemos una variedad de alojamientos: hoteles boutique, cabañas premium, ecolodges y hostales. Cada uno seleccionado por su calidad y experiencias únicas que ofrecen.";
    } else if (lowerMessage.includes('reserva') || lowerMessage.includes('pago')) {
      return "Nuestro sistema de reservas es seguro y fácil de usar. Aceptamos tarjetas de crédito/débito y transferencias. Todas las transacciones están protegidas con encriptación avanzada.";
    } else if (lowerMessage.includes('ecológico') || lowerMessage.includes('sostenible')) {
      return "¡Sí! Tenemos una selección de alojamientos ecológicos certificados que minimizan su impacto ambiental. Estos incluyen eco-lodges en el Parque Tayrona y cabañas sostenibles en el Eje Cafetero.";
    } else if (lowerMessage.includes('destino') || lowerMessage.includes('recomendar')) {
      return "Recomendamos Cartagena por su encanto colonial, Salento por los paisajes cafeteros, el Parque Tayrona por sus playas paradisíacas y Villa de Leyva por su arquitectura colonial.";
    } else if (lowerMessage.includes('cancelación') || lowerMessage.includes('reembolso')) {
      return "Muchos de nuestros alojamientos ofrecen cancelación gratuita hasta 24 horas antes. Los detalles de cancelación específicos se muestran en cada propiedad al momento de reservar.";
    } else {
      return "Gracias por tu pregunta. Quantum Gateway ofrece experiencias de alojamiento únicas en los mejores destinos de Colombia. ¿En qué más puedo ayudarte?";
    }
  }
}
