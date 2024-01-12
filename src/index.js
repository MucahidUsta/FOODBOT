import {View, Text, SafeAreaView} from "react-native"
import React, {useState} from "react"
import { GiftedChat} from "react-native-gifted-chat"
import axios, { Axios } from "axios"
const ChatBot=()=>{
    const [messages, setMessages] = useState([])
    const API_KEY= {YOUR_API_KEY}
    const handleSend = async (newMessages = []) => {
        try{
            //kullanıcı mesajı
            const userMessage = newMessages[0];
            // mesaj ekleme
            setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage))
            const messageText = userMessage.text.toLowerCase();
            const keywords = ['recipe', 'food', 'diet', 'fruit'];
            //gerekli keywordleri ekle zamanla
            if(!keywords.some(keywords => messageText.includes(keywords))){
                //keywordlerden biri degilse bunu yaz
                const botMessage = {
                    _id: new Date().getTime() +1,
                    text:"I'm your food bot, ask me anything related to food and recipe",
                    createdAt: new Date(),
                    user:{
                        _id:2,
                        name:'Food Bot'
                    }
                };
                setMessages(previousMessages=> GiftedChat.append(previousMessages, botMessage));
                return;
            }
            //keywordsleri iceriyorsa bu api ile cevap ver
            const response = await axios.post('your chatGPT API',{
                prompt: `Get me a recipe for ${messageText}`,
                max_tokens: 1200,
                temprature:0.2,
                n:1,
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                   "Authorization": `Bearer ${API_KEY}`
                }
            });
            console.log(response.data);
            const recipe = response.data.choices[0].text.trim();
            const botMessage ={
                _id:new Date().getTime() + 1,
                text: recipe,
                createdAt:new Date(),
                user:{
                    _id:2,
                    name: 'Food Bot'

                }
            };
            setMessages(previousMessages=> GiftedChat.append(previousMessages, botMessage));
        } 
        catch(error){
            console.log(error);
        }
    };
    return(
        <View style= {{ flex:1}}>
            <View 
            style={{
                backgroundColor:'#F5F5F5',
                padding:10,
                alignItems:'center',
                justifyContent:'center',
                borderBottomWidth:1,
                marginTop:40,
                marginBottom:5
            }}>
                <Text style={{
                    fontSize:32,
                    fontWeight:"bold"
                }}>
                        Food Bot
                </Text>
                </View>
                <GiftedChat 
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                user={{_id:1}}
                />

            
        </View>
    )
}

export default ChatBot