# AI Chat - OpenRouter Powered ChatGPT Clone

A mesmerizing ChatGPT clone powered by OpenRouter API with Grok 4.1 Fast for chat and Gemini 2.5 Flash for image generation. Features smooth animations, modern UI, and captivating visual effects.

## Features

✨ **Smooth Animations**: Every interaction features fluid, eye-catching animations  
🤖 **Grok 4.1 Fast**: Powered by xAI's advanced language model  
🎨 **Gemini 2.5 Flash**: Generate stunning images with Google's fast image model  
💬 **Real-time Chat**: Smooth conversational interface  
🖼️ **Image Generation**: Request images by including "generate image" in your prompt  
📱 **Responsive**: Works perfectly on desktop and mobile  
🌌 **Animated Background**: Mesmerizing particle effects  

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Get your OpenRouter API key from [openrouter.ai](https://openrouter.ai)
   - Add your API key to `.env.local`:
     ```
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:8080`

## Usage

- **Chat**: Type your message and press Enter or click the send button
- **Image Generation**: Include phrases like "generate image", "create image", or "draw" in your prompt
- **Voice Input**: Click the microphone button to speak your message (coming soon)
- **Clear Chat**: Use the clear button in the header to start a new conversation

## Technical Details

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React hooks
- **API**: OpenRouter with enforced model selection
- **Responsive**: Mobile-first design with desktop enhancements

## API Integration

This app enforces the use of your OpenRouter API key for all model calls:
- **Text Generation**: Grok 4.1 Fast (`xai:grok-2-180613`)
- **Image Generation**: Gemini 2.5 Flash (`google:gemini-2.5-flash-lite`)

The API integration automatically routes requests through OpenRouter's endpoints, ensuring consistent backend operations.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) section
2. Create a new issue with detailed description
3. Join our Discord community (link in repository)

---

**Made with ❤️ using Dyad**