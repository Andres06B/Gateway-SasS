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
  
  suggestedQuestions = [
    "¿Cómo funciona el sistema de predicción de cancelaciones?",
    "¿Qué métodos de pago aceptan?",
    "¿Cómo protegen mis datos personales?",
    "¿Ofrecen soporte técnico 24/7?"
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.showWelcomeMessage();
    }
  }

  showWelcomeMessage() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de Quantum Gateway. ¿En qué puedo ayudarte hoy?',
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
    
    if (lowerMessage.includes('cancelacion') || lowerMessage.includes('cancelaciones')) {
      return "Nuestro sistema de predicción de cancelaciones utiliza algoritmos con Weka para analizar patrones históricos y predecir qué reservas tienen mayor probabilidad de cancelarse, con un 92% de precisión.";
    } else if (lowerMessage.includes('pago') || lowerMessage.includes('pagos')) {
      return "Aceptamos todas las tarjetas de crédito/débito principales, transferencias bancarias y PayPal. Todos los pagos son procesados con encriptación AES-256 y cumplimiento PCI-DSS.";
    } else if (lowerMessage.includes('seguridad') || lowerMessage.includes('datos')) {
      return "Protegemos tus datos con encriptación de grado bancario y cumplimos con las regulaciones más estrictas. Nuestra infraestructura está certificada PCI DSS nivel 1.";
    } else if (lowerMessage.includes('soporte') || lowerMessage.includes('ayuda')) {
      return "Nuestro equipo de soporte está disponible 24/7 por correo electrónico y chat en vivo. La respuesta promedio es de menos de 30 minutos.";
    } else {
      return "Gracias por tu pregunta. Nuestra plataforma hotelera ofrece gestión inteligente de inventario, comunicación integrada y analítica predictiva para optimizar tu operación. ¿En qué más puedo ayudarte?";
    }
  }
}
