import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-asistente-qa',
  standalone: false,
  templateUrl: './asistente-qa.component.html',
  styleUrl: './asistente-qa.component.css'
})
export class AsistenteQAComponent implements OnInit {
  isOpen = false;
  messages: { text: string; sender: 'user' | 'assistant'; loading?: boolean }[] = [];
  userInput = '';
  showSuggestedQuestions = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  suggestedQuestions = [
    "¿Qué es Quantum Gateway?",
    "¿Qué características ofrece?",
    "¿Cuáles son los precios?",
    "¿Con qué sistemas se integra?",
    "¿Cómo garantizan la seguridad?",
    "¿Ofrecen período de prueba?",
    "¿Cómo puedo contactarlos?"
  ];

  knowledgeBase = {
    "quantum gateway": "Quantum Gateway es un sistema de gestión hotelera premium que incluye control de habitaciones, gestión de reservas, facturación y análisis predictivo con IA.",
    "características": "Nuestro sistema ofrece: panel administrativo completo, gestión de huéspedes, programación inteligente, sistema de pagos integrado y reportes financieros en tiempo real.",
    "precios": "Ofrecemos un Plan Básico gratuito y un Plan Premium a $3,500,000 COP/mes con IA predictiva y soporte 24/7.",
    "integraciones": "Se integra con canales de distribución como Booking y Expedia, sistemas de pago y herramientas de marketing.",
    "seguridad": "Usamos encriptación AES-256, autenticación multifactor y cumplimiento GDPR/LOPD para proteger tus datos.",
    "prueba": "Ofrecemos 14 días gratis para probar todas las funciones sin compromiso.",
    "contacto": "Puedes contactarnos al +57 (302) 8667326 o por email a contactoquantumgateway.com. Soporte disponible 24/7."
  };

  greetings = [
    "¡Hola! Soy el asistente de Quantum Gateway. ¿En qué puedo ayudarte hoy?",
    "Hola, ¿qué información necesitas sobre nuestro sistema de gestión hotelera?",
    "Bienvenido al asistente virtual de Quantum Gateway. ¿Cómo puedo asistirte?"
  ];

  ngOnInit() {
    this.addAssistantMessage(this.greetings[Math.floor(Math.random() * this.greetings.length)]);
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.showSuggestedQuestions = true;
    }
  }

  addAssistantMessage(text: string) {
    this.messages.push({ text, sender: 'assistant' });
    this.scrollToBottom();
  }

  addUserMessage(text: string) {
    this.messages.push({ text, sender: 'user' });
    this.showSuggestedQuestions = false;
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.addUserMessage(this.userInput);
      const question = this.userInput.toLowerCase();
      this.userInput = '';

      this.messages.push({ text: '', sender: 'assistant', loading: true });
      this.scrollToBottom();

      setTimeout(() => {
        this.messages.pop();
        this.processQuestion(question);
      }, 800);
    }
  }

  sendSuggestedQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  processQuestion(question: string) {
    let response = '';
    const matchedKey = Object.keys(this.knowledgeBase).find(key =>
      question.includes(key.toLowerCase())
    );

    if (question.includes('hola') || question.includes('buenos días') || question.includes('buenas tardes')) {
      response = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    } else if (matchedKey && matchedKey in this.knowledgeBase) {
      response = this.knowledgeBase[matchedKey as keyof typeof this.knowledgeBase];
    } else {
      response = "Puedo ayudarte con información sobre: características, precios, integraciones, seguridad y más. ¿Qué te gustaría saber?";
      this.showSuggestedQuestions = true;
    }

    this.addAssistantMessage(response);
  }

  scrollToBottom() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
