import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Profile } from "./pages/Profile";
import { ChatPage } from "./pages/ChatPage";
import { ChatList } from "./components/ChatList/ChatList";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Provider } from "react-redux";
import { store } from "./store/ConfigureStore";


import { defultContext, ThemeContext } from "./utils/ThemeContent";



const defaultMessages = {
  default: [
    { author: "user", text: "hi" },
    { author: "user", text: "hello" },
  ],
};

function App() {
  const [messages, setMessages] = useState(defaultMessages);
  const [theme, setTheme] = useState(defultContext.theme);

  const chats = Object.keys(messages).map((chat) => ({
    id: nanoid(),
    name: chat,
  }));

  const onAddChat = (newChat) => {
    // console.log("newChat", newChat);
    setMessages({ ...messages, 
      [newChat.name]: [] });
  };
  const onAddMessage = (chatId, newMessage) => {
    setMessages({ ...messages, 
      [chatId]: [...messages[chatId], newMessage] });
  };


  const toggleTheme =()=>{
    setTheme(theme ==='light'?'dark':"light")
  }
  return (
    <>
      <Provider store={store}>
        <ThemeContext.Provider value={{ defultContext, theme, toggleTheme }}>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<MainPage />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="ChatPage">
                <Route
                  index
                  element={<ChatList chats={chats} onAddChat={onAddChat} />}
                />
                <Route
                  path=":chatId"
                  element={
                    <ChatPage
                      chats={chats}
                      messages={messages}
                      onAddMessage={onAddMessage}
                      onAddChat={onAddChat}
                    />
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<h1>ERROR 404. PAGE NOT FOUND</h1>} />
          </Routes>
        </ThemeContext.Provider>
      </Provider>
    </>
  );
}

export default App;
