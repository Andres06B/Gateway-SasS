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
  messages: { text: string, sender: 'user' | 'assistant', loading?: boolean }[] = [];
  showSuggestedQuestions = true;
  waitingForConfirmation = false;

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
    } else if (this.isOpen) {
      this.showContinueOptions();
    }
  }

  showWelcomeMessage() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de Quantum Gateway. ¿En qué puedo ayudarte con tus reservas hoy?',
      sender: 'assistant'
    });
    this.showSuggestedQuestions = true;
  }

  showContinueOptions() {
    this.messages.push({
      text: '¿Te gustaría seguir preguntando sobre alojamientos, reservas u otros temas? Estoy aquí para ayudarte.',
      sender: 'assistant'
    });
    this.showSuggestedQuestions = true;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim().toLowerCase();

    if (this.waitingForConfirmation) {
      this.handleConfirmationResponse(userMessage);
      return;
    }

    this.addUserMessage(this.userInput);
    this.userInput = '';
    this.showSuggestedQuestions = false;

    this.showLoadingIndicator();

    setTimeout(() => {
      this.removeLoadingIndicator();
      const response = this.getResponseForMessage(userMessage);
      this.addAssistantMessage(response);
      this.askForAnotherQuestion();
    }, 1000);
  }

  handleConfirmationResponse(message: string) {
    if (['sí', 'si', 'yes', 'claro'].includes(message)) {
      this.addAssistantMessage('¡Genial! ¿Sobre qué tema te gustaría saber más ahora?');
      this.showSuggestedQuestions = true;
    } else {
      this.addAssistantMessage('Perfecto. Si necesitas más información, no dudes en volver a escribirme.');
    }
    this.waitingForConfirmation = false;
    this.userInput = '';
  }

  askForAnotherQuestion() {
    this.waitingForConfirmation = true;
    this.addAssistantMessage('¿Te gustaría hacer otra pregunta? Responde "sí" o "no".');
  }

  addUserMessage(text: string) {
    this.messages.push({ text, sender: 'user' });
  }

  addAssistantMessage(text: string) {
    this.messages.push({ text, sender: 'assistant' });
  }

  showLoadingIndicator() {
    this.messages.push({ text: '', sender: 'assistant', loading: true });
  }

  removeLoadingIndicator() {
    this.messages.pop();
  }

  sendSuggestedQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  getResponseForMessage(message: string): string {
    if (message.includes('alojamiento') || message.includes('hotel') || message.includes('cabaña')) {
      return "Ofrecemos una variedad de alojamientos: hoteles boutique, cabañas premium, ecolodges y hostales. Cada uno seleccionado por su calidad y experiencias únicas.";
    } else if (message.includes('reserva') || message.includes('pago')) {
      return "Nuestro sistema de reservas es seguro y fácil de usar. Aceptamos tarjetas de crédito/débito y transferencias. Todas las transacciones están protegidas con encriptación avanzada.";
    } else if (message.includes('ecológico') || message.includes('sostenible')) {
      return "¡Sí! Tenemos una selección de alojamientos ecológicos certificados que minimizan su impacto ambiental, incluyendo opciones en el Parque Tayrona y el Eje Cafetero.";
    } else if (message.includes('destino') || message.includes('recomendar')) {
      return "Recomendamos Cartagena, Salento, el Parque Tayrona y Villa de Leyva por su belleza natural y valor cultural.";
    } else if (message.includes('cancelación') || message.includes('reembolso')) {
      return "Muchos alojamientos ofrecen cancelación gratuita hasta 24 horas antes. Los detalles están disponibles en cada propiedad al reservar.";
    } else {
      return "Gracias por tu consulta. Quantum Gateway ofrece experiencias únicas en los mejores destinos de Colombia. ¿Hay algo más que te gustaría saber?";
    }
  }
}
