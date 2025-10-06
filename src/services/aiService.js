
ai_service_js = '''import { productsAPI } from './api';
import storageService from './storage';

// AI Service Configuration
const AI_CONFIG = {
  conversationTimeout: 30 * 60 * 1000, // 30 minutes
  maxConversationHistory: 50,
  confidenceThreshold: 0.7,
  maxRecommendations: 5,
};

// Product categories and their keywords
const CATEGORY_KEYWORDS = {
  'AI Assistants': [
    'chatgpt', 'claude', 'bard', 'assistant', 'chat', 'conversation', 
    'help', 'support', 'questions', 'answers', 'text generation', 'language model'
  ],
  'AI Art': [
    'midjourney', 'dalle', 'image', 'art', 'picture', 'visual', 'design', 
    'creative', 'illustration', 'drawing', 'painting', 'generation'
  ],
  'Productivity': [
    'notion', 'productivity', 'work', 'organize', 'notes', 'planning', 
    'workflow', 'efficiency', 'management', 'tasks', 'collaboration'
  ],
  'Development': [
    'github', 'copilot', 'coding', 'programming', 'development', 'code', 
    'software', 'api', 'debugging', 'ide', 'javascript', 'python'
  ],
  'Writing': [
    'jasper', 'copy', 'writing', 'content', 'blog', 'marketing', 
    'copywriting', 'editing', 'grammar', 'proofreading', 'articles'
  ],
  'Analytics': [
    'data', 'analytics', 'insights', 'reporting', 'metrics', 'analysis', 
    'statistics', 'dashboard', 'visualization', 'business intelligence'
  ],
};

// Intent recognition patterns
const INTENT_PATTERNS = {
  recommendation: [
    'recommend', 'suggest', 'best', 'top', 'which', 'what should', 'help me find',
    'looking for', 'need', 'want', 'show me', 'find me'
  ],
  comparison: [
    'compare', 'vs', 'versus', 'difference', 'better', 'which is best',
    'pros and cons', 'advantages', 'disadvantages'
  ],
  information: [
    'what is', 'how does', 'tell me about', 'explain', 'describe',
    'information about', 'details', 'features'
  ],
  pricing: [
    'price', 'cost', 'expensive', 'cheap', 'affordable', 'budget',
    'free', 'pricing', 'subscription', 'plan'
  ],
  features: [
    'features', 'capabilities', 'what can', 'functionality', 'specs',
    'specifications', 'options', 'tools'
  ],
};

// Response templates
const RESPONSE_TEMPLATES = {
  greeting: [
    'Hello! I\'m your AI product advisor. I can help you find the perfect AI tools for your needs.',
    'Hi there! I\'m here to help you discover amazing AI products. What are you looking to accomplish?',
    'Welcome! I specialize in helping people find the right AI tools. How can I assist you today?'
  ],
  
  clarification: [
    'Could you tell me more about what you\'re looking to accomplish?',
    'To give you better recommendations, could you share more details about your needs?',
    'I\'d love to help! Can you provide more context about your use case?'
  ],
  
  noResults: [
    'I couldn\'t find specific products matching that criteria. Could you try rephrasing your request?',
    'Let me know if you\'d like to explore different options or modify your requirements.',
    'I\'m here to help find the perfect solution. Can you provide more details about what you need?'
  ],
};

class AIService {
  constructor() {
    this.conversationHistory = [];
    this.userContext = {};
    this.lastInteraction = null;
  }

  // Initialize service with user context
  async initialize(userProfile = null) {
    try {
      this.userContext = {
        profile: userProfile,
        preferences: await storageService.getUserPreferences(),
        favorites: await storageService.getFavorites(),
        recentSearches: await storageService.getRecentSearches(),
        comparisonHistory: await storageService.getComparisonHistory(),
      };
      
      console.log('🤖 AI Service initialized with user context');
    } catch (error) {
      console.error('❌ AI Service initialization error:', error);
    }
  }

  // Main method for getting AI responses
  async getResponse(userMessage, context = {}) {
    try {
      const startTime = Date.now();
      
      // Clean and prepare the message
      const cleanMessage = this.preprocessMessage(userMessage);
      
      // Add to conversation history
      this.addToHistory('user', cleanMessage);
      
      // Analyze user intent and extract entities
      const analysis = this.analyzeMessage(cleanMessage);
      
      // Generate contextual response
      const response = await this.generateResponse(analysis, context);
      
      // Add AI response to history
      this.addToHistory('assistant', response.text);
      
      // Update user context based on interaction
      this.updateUserContext(analysis);
      
      // Track interaction
      await this.trackInteraction({
        userMessage: cleanMessage,
        aiResponse: response.text,
        intent: analysis.intent,
        categories: analysis.categories,
        responseTime: Date.now() - startTime,
      });
      
      return {
        success: true,
        response: response.text,
        intent: analysis.intent,
        categories: analysis.categories,
        recommendations: response.recommendations || [],
        followUpQuestions: response.followUpQuestions || [],
        metadata: {
          confidence: response.confidence || 0.8,
          responseTime: Date.now() - startTime,
        },
      };
      
    } catch (error) {
      console.error('❌ AI Service error:', error);
      return {
        success: false,
        response: 'I apologize, but I encountered an error. Please try rephrasing your question.',
        error: error.message,
      };
    }
  }

  // Preprocess user message
  preprocessMessage(message) {
    return message
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ');
  }

  // Analyze user message for intent and entities
  analyzeMessage(message) {
    const analysis = {
      intent: 'information',
      categories: [],
      keywords: [],
      entities: {},
      confidence: 0.5,
    };

    // Detect intent
    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
      const matches = patterns.filter(pattern => message.includes(pattern)).length;
      if (matches > 0) {
        analysis.intent = intent;
        analysis.confidence = Math.min(0.9, 0.5 + (matches * 0.2));
        break;
      }
    }

    // Detect categories
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const matches = keywords.filter(keyword => message.includes(keyword)).length;
      if (matches > 0) {
        analysis.categories.push({
          category,
          confidence: Math.min(0.9, matches * 0.3),
          matchedKeywords: keywords.filter(keyword => message.includes(keyword)),
        });
      }
    }

    // Sort categories by confidence
    analysis.categories.sort((a, b) => b.confidence - a.confidence);

    // Extract specific product mentions
    this.extractProductMentions(message, analysis);

    // Extract pricing context
    this.extractPricingContext(message, analysis);

    return analysis;
  }

  // Extract product mentions from message
  extractProductMentions(message, analysis) {
    const productNames = [
      'chatgpt', 'claude', 'bard', 'midjourney', 'dalle', 'notion',
      'github copilot', 'jasper', 'copy.ai', 'grammarly', 'canva'
    ];

    analysis.entities.mentionedProducts = productNames.filter(
      product => message.includes(product.toLowerCase())
    );
  }

  // Extract pricing context from message
  extractPricingContext(message, analysis) {
    const pricingKeywords = {
      free: ['free', 'no cost', 'zero cost'],
      budget: ['cheap', 'affordable', 'budget', 'low cost'],
      premium: ['expensive', 'premium', 'high-end', 'enterprise'],
    };

    for (const [priceRange, keywords] of Object.entries(pricingKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        analysis.entities.priceRange = priceRange;
        break;
      }
    }

    // Extract specific price mentions
    const priceMatches = message.match(/\$\d+/g);
    if (priceMatches) {
      analysis.entities.mentionedPrices = priceMatches;
    }
  }

  // Generate contextual response based on analysis
  async generateResponse(analysis, context = {}) {
    const response = {
      text: '',
      recommendations: [],
      followUpQuestions: [],
      confidence: analysis.confidence,
    };

    try {
      switch (analysis.intent) {
        case 'recommendation':
          response.text = await this.generateRecommendationResponse(analysis);
          response.recommendations = await this.getProductRecommendations(analysis);
          response.followUpQuestions = this.generateFollowUpQuestions(analysis);
          break;

        case 'comparison':
          response.text = await this.generateComparisonResponse(analysis);
          break;

        case 'pricing':
          response.text = await this.generatePricingResponse(analysis);
          break;

        case 'features':
          response.text = await this.generateFeaturesResponse(analysis);
          break;

        default:
          response.text = await this.generateInformationResponse(analysis);
      }

      // Add personalization based on user context
      response.text = this.personalizeResponse(response.text, analysis);

    } catch (error) {
      console.error('Response generation error:', error);
      response.text = this.getFallbackResponse();
    }

    return response;
  }

  // Generate recommendation response
  async generateRecommendationResponse(analysis) {
    if (analysis.categories.length === 0) {
      return 'I\'d be happy to help you find the perfect AI tools! Could you tell me more about what you\'re looking to accomplish? For example, are you interested in:\\n\\n• **Writing and content creation**\\n• **Image and art generation**\\n• **Coding and development**\\n• **Productivity and organization**\\n• **Data analysis and insights**\\n\\nLet me know your specific needs and I\'ll provide personalized recommendations!';
    }

    const primaryCategory = analysis.categories[0].category;
    
    const responses = {
      'AI Assistants': 'For AI assistants and conversational tools, here are my top recommendations:\\n\\n**1. ChatGPT Plus ($20/month)**\\n• Most advanced language model (GPT-4)\\n• Excellent for complex reasoning and coding\\n• Custom instructions and plugins\\n\\n**2. Claude Pro ($20/month)**\\n• Large context window (200K tokens)\\n• Great for document analysis\\n• Strong safety measures\\n\\n**3. Google Bard (Free)**\\n• Real-time information access\\n• Google services integration\\n• No usage limits\\n\\nWhat specific tasks do you want to use an AI assistant for?',
      
      'AI Art': 'For AI image generation and creative tools, I recommend:\\n\\n**1. Midjourney ($10/month)**\\n• Exceptional artistic quality\\n• Great community and styles\\n• Perfect for creative projects\\n\\n**2. DALL-E 2 ($15/month)**\\n• Realistic image generation\\n• Precise prompt following\\n• Commercial usage rights\\n\\n**3. Adobe Firefly (Creative Cloud)**\\n• Commercially safe training data\\n• Adobe ecosystem integration\\n• Professional workflows\\n\\nWhat type of images are you looking to create?',
      
      'Development': 'For coding and development assistance:\\n\\n**1. GitHub Copilot ($10/month)**\\n• Best overall code completion\\n• Multi-language support\\n• IDE integration\\n\\n**2. Tabnine (Free tier available)**\\n• Privacy-focused options\\n• Team collaboration features\\n• Local model options\\n\\n**3. Amazon CodeWhisperer (Free)**\\n• AWS integration\\n• Security scanning\\n• Real-time suggestions\\n\\nWhat programming languages do you work with most?',
      
      'Productivity': 'For productivity and workflow optimization:\\n\\n**1. Notion AI ($8/month)**\\n• Seamless workspace integration\\n• Content generation and summarization\\n• Template creation\\n\\n**2. Microsoft Copilot (Office 365)**\\n• Full Office suite integration\\n• Email and document assistance\\n• Meeting summaries\\n\\n**3. Zapier AI (Various pricing)**\\n• Workflow automation\\n• App integrations\\n• Natural language setup\\n\\nWhat\'s your main productivity challenge?',
    };

    return responses[primaryCategory] || this.generateGenericRecommendation(analysis);
  }

  // Generate comparison response
  async generateComparisonResponse(analysis) {
    if (analysis.entities.mentionedProducts?.length >= 2) {
      const products = analysis.entities.mentionedProducts.slice(0, 2);
      return `Great question! Comparing ${products[0]} vs ${products[1]}:\\n\\nI can provide a detailed comparison covering:\\n• **Features and capabilities**\\n• **Pricing and value**\\n• **Use cases and strengths**\\n• **Pros and cons**\\n\\nWould you like me to break down the comparison, or would you prefer to use our comparison tool to see a side-by-side analysis?`;
    }

    return 'I\'d be happy to help you compare AI tools! To give you the most relevant comparison, could you tell me:\\n\\n• Which specific tools are you considering?\\n• What will you primarily use them for?\\n• What\'s your budget range?\\n• Do you need team collaboration features?\\n\\nYou can also use our comparison tool to see detailed feature breakdowns side-by-side!';
  }

  // Generate pricing response
  async generatePricingResponse(analysis) {
    const budgetLevel = analysis.entities.priceRange;
    
    if (budgetLevel === 'free') {
      return 'Here are excellent AI tools with free options:\\n\\n**Completely Free:**\\n• **ChatGPT Free** - GPT-3.5 with usage limits\\n• **Google Bard** - Full access, no limits\\n• **Bing Chat** - GPT-4 access with Edge\\n\\n**Generous Free Tiers:**\\n• **Claude** - Good monthly allowance\\n• **Hugging Face** - Open source models\\n• **Stable Diffusion** - Free local install\\n\\n**Free Trials Worth Trying:**\\n• **ChatGPT Plus** - 1 week trial\\n• **Midjourney** - Limited generations\\n\\nWhat type of AI functionality are you looking for?';
    }
    
    if (budgetLevel === 'budget') {
      return 'Best value AI tools under $15/month:\\n\\n**Under $10:**\\n• **Midjourney** ($10/month) - Premium image generation\\n• **GitHub Copilot** ($10/month) - If you\'re a developer\\n\\n**Under $15:**\\n• **Notion AI** ($8/month) - Productivity powerhouse\\n• **DALL-E 2** ($15/month) - Realistic images\\n\\n**Money-Saving Tips:**\\n• Annual subscriptions often 20% cheaper\\n• Student discounts available\\n• Free trials to test before buying\\n\\nWhat\'s your monthly budget range?';
    }

    return 'AI tool pricing varies widely based on features and usage:\\n\\n**Free Tier** - Basic functionality, usage limits\\n**$8-15/month** - Most consumer tools\\n**$20-30/month** - Premium features, higher limits\\n**$50+/month** - Enterprise, unlimited usage\\n\\n**Factors affecting price:**\\n• Model quality (GPT-4 vs GPT-3.5)\\n• Usage limits and quotas\\n• Commercial usage rights\\n• Team collaboration features\\n\\nWhat\'s your budget range and primary use case?';
  }

  // Get product recommendations based on analysis
  async getProductRecommendations(analysis) {
    const recommendations = [];
    
    try {
      // Mock product recommendations based on categories
      if (analysis.categories.length > 0) {
        const primaryCategory = analysis.categories[0].category;
        
        const categoryProducts = {
          'AI Assistants': [1, 2], // ChatGPT Plus, Claude Pro
          'AI Art': [3, 6], // Midjourney, DALL-E 2
          'Development': [4], // GitHub Copilot
          'Productivity': [5], // Notion AI
        };
        
        const productIds = categoryProducts[primaryCategory] || [];
        
        for (const id of productIds) {
          recommendations.push({
            productId: id,
            reason: `Perfect match for ${primaryCategory.toLowerCase()}`,
            confidence: 0.9,
          });
        }
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
    
    return recommendations.slice(0, AI_CONFIG.maxRecommendations);
  }

  // Generate follow-up questions
  generateFollowUpQuestions(analysis) {
    const questions = [];
    
    if (analysis.categories.length > 0) {
      const category = analysis.categories[0].category;
      
      const categoryQuestions = {
        'AI Assistants': [
          'What specific tasks do you want help with?',
          'Do you need coding assistance?',
          'Is document analysis important to you?'
        ],
        'AI Art': [
          'What style of images do you prefer?',
          'Do you need commercial usage rights?',
          'Are you creating for social media or print?'
        ],
        'Development': [
          'What programming languages do you use?',
          'Do you work in a team environment?',
          'Is security scanning important?'
        ],
        'Productivity': [
          'What\'s your biggest productivity challenge?',
          'Do you need team collaboration?',
          'Are you looking for workflow automation?'
        ],
      };
      
      questions.push(...(categoryQuestions[category] || []));
    } else {
      questions.push(
        'What type of work do you do?',
        'What\'s your experience level with AI tools?',
        'Do you have any budget constraints?'
      );
    }
    
    return questions.slice(0, 3);
  }

  // Personalize response based on user context
  personalizeResponse(response, analysis) {
    // Add user's name if available
    if (this.userContext.profile?.name) {
      response = response.replace(/^(Hi|Hello)!?/, `Hi ${this.userContext.profile.name}!`);
    }

    // Reference previous conversations
    if (this.conversationHistory.length > 2) {
      const recentTopics = this.getRecentTopics();
      if (recentTopics.length > 0) {
        // Could add context like "Building on our previous discussion about..."
      }
    }

    // Reference user favorites
    if (this.userContext.favorites?.length > 0 && analysis.intent === 'recommendation') {
      response += '\\n\\n💡 *Based on your favorites, you might also be interested in similar tools.*';
    }

    return response;
  }

  // Get recent conversation topics
  getRecentTopics() {
    const recentMessages = this.conversationHistory.slice(-10);
    const topics = new Set();
    
    recentMessages.forEach(message => {
      if (message.role === 'user') {
        Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
          if (keywords.some(keyword => message.content.includes(keyword))) {
            topics.add(category);
          }
        });
      }
    });
    
    return Array.from(topics);
  }

  // Add message to conversation history
  addToHistory(role, content) {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date().toISOString(),
    });

    // Keep only recent messages
    if (this.conversationHistory.length > AI_CONFIG.maxConversationHistory) {
      this.conversationHistory = this.conversationHistory.slice(-AI_CONFIG.maxConversationHistory);
    }

    this.lastInteraction = Date.now();
  }

  // Update user context based on interaction
  updateUserContext(analysis) {
    // Track user interests
    if (!this.userContext.interests) {
      this.userContext.interests = {};
    }

    analysis.categories.forEach(category => {
      const categoryName = category.category;
      this.userContext.interests[categoryName] = 
        (this.userContext.interests[categoryName] || 0) + category.confidence;
    });
  }

  // Track interaction for analytics
  async trackInteraction(data) {
    try {
      const interaction = {
        ...data,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
      };

      // Store locally for now (could send to analytics service)
      const interactions = await storageService.getItem('aiInteractions', []);
      interactions.push(interaction);
      
      // Keep only last 100 interactions
      const recentInteractions = interactions.slice(-100);
      await storageService.setItem('aiInteractions', recentInteractions);
      
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  }

  // Get fallback response
  getFallbackResponse() {
    const fallbacks = [
      'I\'m here to help you find the perfect AI tools! Could you tell me more about what you\'re looking for?',
      'Let me help you discover amazing AI products. What would you like to accomplish?',
      'I\'d love to assist you in finding the right AI solution. Can you share more details about your needs?',
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Generate generic recommendation
  generateGenericRecommendation(analysis) {
    return 'I can help you find the perfect AI tools! Here are some popular categories to explore:\\n\\n🤖 **AI Assistants** - ChatGPT, Claude, Bard for conversations and help\\n🎨 **AI Art** - Midjourney, DALL-E for image generation\\n💼 **Productivity** - Notion AI, Jasper for work and content\\n👨‍💻 **Development** - GitHub Copilot, Tabnine for coding\\n\\nWhich area interests you most, or do you have a specific task in mind?';
  }

  // Get or create session ID
  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    return this.sessionId;
  }

  // Clear conversation history
  clearConversation() {
    this.conversationHistory = [];
    this.lastInteraction = null;
    console.log('🧹 Conversation history cleared');
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Check if conversation is expired
  isConversationExpired() {
    if (!this.lastInteraction) return false;
    return Date.now() - this.lastInteraction > AI_CONFIG.conversationTimeout;
  }

  // Get user context
  getUserContext() {
    return this.userContext;
  }

  // Update user context
  setUserContext(context) {
    this.userContext = { ...this.userContext, ...context };
  }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;

// Also export the class for testing
export { AIService, AI_CONFIG, CATEGORY_KEYWORDS, INTENT_PATTERNS };''';

print("✅ Created aiService.js")
print(f"Length: {len(ai_service_js)} characters")

# Create comprehensive CSV with all 6 files
all_files_data = [
    ["src/styles/Colors.js", colors_js, "Complete color system with palette, gradients, shadows, and theme support"],
    ["src/styles/Typography.js", typography_js, "Comprehensive typography system with font families, sizes, and text styles"],
    ["src/styles/Spacing.js", spacing_js, "Complete spacing system with padding, margin, border radius, and layout dimensions"],
    ["src/services/api.js", api_js, "Full-featured API service with authentication, error handling, retry logic, and all endpoints"],
    ["src/services/storage.js", storage_js, "Complete AsyncStorage wrapper with caching, user preferences, and data management"],
    ["src/services/aiService.js", ai_service_js, "Advanced AI service with natural language processing, intent recognition, and contextual responses"],
]

import csv
with open('styles_and_services_files.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['File Path', 'Complete Code', 'Description'])
    
    for file_data in all_files_data:
        writer.writerow(file_data)

print(f"\n🎯 All 6 Files Complete!")
print("📁 Files saved to: styles_and_services_files.csv")
print("\n📊 Summary:")
for i, file_data in enumerate(all_files_data, 1):
    filename = file_data[0].split('/')[-1]
    description = file_data[2]
    char_count = len(file_data[1])
    print(f"{i}. {filename} ({char_count:,} chars) - {description}")
