import { Component } from '@angular/core';

@Component({
  selector: 'app-asistente-qw',
  standalone: false,
  templateUrl: './asistente-qw.component.html',
  styleUrl: './asistente-qw.component.css'
})
export class AsistenteQWComponent {
  isOpen = false;
  userInput = '';
  messages: {text: string, sender: 'user' | 'assistant', loading?: boolean}[] = [];
  showSuggestedQuestions = true;
  waitingForConfirmation = false;
  
  suggestedQuestions = [
    "¿Cómo funciona el sistema de predicción de cancelaciones?",
    "¿Qué métodos de pago aceptan?",
    "¿Cómo protegen mis datos personales?",
    "¿Ofrecen soporte técnico 24/7?",
    "¿Qué ventajas tiene su sistema de gestión hotelera?"
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.showWelcomeMessage();
    } else if (this.isOpen) {
      // Si se reabre el chat, mostramos opciones para continuar
      this.showContinueOptions();
    }
  }

  showWelcomeMessage() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de Quantum Gateway. ¿En qué puedo ayudarte hoy?',
      sender: 'assistant'
    });
    this.showSuggestedQuestions = true;
  }

  showContinueOptions() {
    this.messages.push({
      text: '¿En qué más puedo ayudarte? Puedes continuar con tu consulta anterior o preguntar algo nuevo.',
      sender: 'assistant'
    });
    this.showSuggestedQuestions = true;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    
    const userMessage = this.userInput.trim().toLowerCase();
    
    // Manejar confirmación para nueva pregunta
    if (this.waitingForConfirmation) {
      this.handleConfirmationResponse(userMessage);
      return;
    }
    
    // Procesar mensaje normal
    this.addUserMessage(this.userInput);
    this.userInput = '';
    this.showSuggestedQuestions = false;
    
    this.showLoadingIndicator();
    
    setTimeout(() => {
      this.removeLoadingIndicator();
      const response = this.getResponseForMessage(userMessage);
      this.addAssistantMessage(response);
      
      // Preguntar si quiere hacer otra consulta
      this.askForAnotherQuestion();
    }, 1000);
  }

  handleConfirmationResponse(userMessage: string) {
    if (userMessage === 'sí' || userMessage === 'si' || userMessage === 'yes' || userMessage === 'claro') {
      this.addAssistantMessage('¡Perfecto! ¿Sobre qué tema te gustaría información ahora?');
      this.showSuggestedQuestions = true;
    } else {
      this.addAssistantMessage('Entendido. Si necesitas algo más, no dudes en preguntar. ¡Estoy aquí para ayudarte!');
    }
    this.waitingForConfirmation = false;
    this.userInput = '';
  }

  askForAnotherQuestion() {
    this.waitingForConfirmation = true;
    this.addAssistantMessage('¿Te gustaría hacer otra pregunta? Responde "sí" o "no"');
  }

  addUserMessage(text: string) {
    this.messages.push({
      text: text,
      sender: 'user'
    });
  }

  addAssistantMessage(text: string) {
    this.messages.push({
      text: text,
      sender: 'assistant'
    });
  }

  showLoadingIndicator() {
    this.messages.push({
      text: '',
      sender: 'assistant',
      loading: true
    });
  }

  removeLoadingIndicator() {
    this.messages.pop();
  }

  sendSuggestedQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  getResponseForMessage(message: string): string {
    if (message.includes('cancelacion') || message.includes('cancelaciones')) {
      return "Nuestro sistema de predicción de cancelaciones utiliza algoritmos con Weka para analizar patrones históricos y predecir qué reservas tienen mayor probabilidad de cancelarse, con un 97% de precisión.";
    } else if (message.includes('pago') || message.includes('pagos')) {
      return "Aceptamos todas las tarjetas de crédito/débito principales, transferencias bancarias y PayPal. Todos los pagos son procesados con encriptación AES-256 y cumplimiento PCI-DSS.";
    } else if (message.includes('seguridad') || message.includes('datos')) {
      return "Protegemos tus datos con encriptación de grado bancario y cumplimos con las regulaciones más estrictas. Nuestra infraestructura está certificada PCI DSS nivel 1.";
    } else if (message.includes('soporte') || message.includes('ayuda')) {
      return "Nuestro equipo de soporte está disponible 24/7 por correo electrónico y chat en vivo. La respuesta promedio es de menos de 30 minutos.";
    } else if (message.includes('ventaja') || message.includes('beneficio')) {
      return "Nuestra plataforma ofrece: 1) Reducción del 30% en cancelaciones, 2) Aumento del 22% en ocupación promedio, 3) Automatización del 80% de tareas repetitivas.";
    } else {
      return "Gracias por tu pregunta. Nuestra plataforma hotelera ofrece gestión inteligente de inventario, comunicación integrada y analítica predictiva para optimizar tu operación.";
    }
  }
}