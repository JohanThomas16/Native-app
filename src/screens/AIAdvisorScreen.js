ai_advisor_screen = '''import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Gradients} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const AIAdvisorScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI product advisor. I can help you find the perfect AI tools for your needs. What are you looking to accomplish?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const suggestedQuestions = [
    "What's the best AI writing tool?",
    "I need help with image generation",
    "Which AI coding assistant should I use?",
    "Compare ChatGPT vs Claude",
  ];

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  }, [messages]);

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let response = '';
      
      if (userMessage.toLowerCase().includes('writing')) {
        response = "For AI writing, I recommend:\\n\\n1. **ChatGPT Plus** - Great for creative and technical writing\\n2. **Jasper AI** - Excellent for marketing copy\\n3. **Grammarly** - Best for editing and grammar\\n\\nWhat type of writing do you do most?";
      } else if (userMessage.toLowerCase().includes('image') || userMessage.toLowerCase().includes('art')) {
        response = "For AI image generation, here are top options:\\n\\n1. **Midjourney** - Artistic and creative images\\n2. **DALL-E 2** - Realistic and precise images\\n3. **Stable Diffusion** - Open-source and customizable\\n\\nWhat style of images are you looking to create?";
      } else if (userMessage.toLowerCase().includes('coding') || userMessage.toLowerCase().includes('programming')) {
        response = "For coding assistance, I suggest:\\n\\n1. **GitHub Copilot** - Best overall code completion\\n2. **Tabnine** - Good for multiple languages\\n3. **CodeT5** - Great for code explanation\\n\\nWhat programming languages do you work with?";
      } else {
        response = "I can help you find the perfect AI tools! Could you tell me more about:\\n\\n• What tasks you want to automate\\n• Your budget range\\n• Your technical skill level\\n\\nThis will help me give you personalized recommendations.";
      }
      
      const aiMessage = {
        id: Date.now(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      simulateAIResponse(inputText.trim());
      setInputText('');
    }
  };

  const handleSuggestedQuestion = (question) => {
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(question);
  };

  const renderMessage = (message) => {
    const isAI = message.sender === 'ai';
    
    return (
      <View
        key={message.id}
        style={[styles.messageContainer, isAI ? styles.aiMessage : styles.userMessage]}>
        {isAI && (
          <LinearGradient colors={Gradients.primary} style={styles.aiAvatar}>
            <Icon name="psychology" size={16} color={Colors.white} />
          </LinearGradient>
        )}
        <View style={[styles.messageBubble, isAI ? styles.aiBubble : styles.userBubble]}>
          <Text style={[styles.messageText, isAI ? styles.aiText : styles.userText]}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <LinearGradient colors={Gradients.primary} style={styles.header}>
        <Text style={styles.headerTitle}>AI Advisor</Text>
        <Text style={styles.headerSubtitle}>Get personalized AI tool recommendations</Text>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <LinearGradient colors={Gradients.primary} style={styles.aiAvatar}>
              <Icon name="psychology" size={16} color={Colors.white} />
            </LinearGradient>
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Try asking:</Text>
            {suggestedQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSuggestedQuestion(question)}>
                <Text style={styles.suggestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about AI tools..."
            placeholderTextColor={Colors.gray}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!inputText.trim()}>
            <Icon name="send" size={20} color={inputText.trim() ? Colors.white : Colors.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body1,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  messageContainer: {
    marginBottom: Spacing.md,
  },
  aiMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  aiBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: BorderRadius.xs,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: BorderRadius.xs,
  },
  messageText: {
    ...Typography.body1,
    lineHeight: 22,
  },
  aiText: {
    color: Colors.text,
  },
  userText: {
    color: Colors.white,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray,
    marginRight: Spacing.xs,
  },
  suggestionsContainer: {
    marginTop: Spacing.lg,
  },
  suggestionsTitle: {
    ...Typography.body1,
    fontWeight: '600',
    marginBottom: Spacing.md,
    color: Colors.textSecondary,
  },
  suggestionButton: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    ...Typography.body1,
    color: Colors.primary,
  },
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    ...Typography.body1,
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
    backgroundColor: Colors.lightGray,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
});

export default AIAdvisorScreen;''';

print("✅ Created AIAdvisorScreen.js")
print(f"Length: {len(ai_advisor_screen)} characters")
