const Message = () => {
  return (
    <div className="chat chat-end">
            <div className="chat-image avatar">
            <div className="w-10 rounded-full " >
                <img alt="" src={"https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/317870211_8371882942884370_5656338546419061213_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7qYWcWG_h6sAb43iEBO&_nc_ht=scontent.fmnl17-3.fna&oh=00_AfA6vlgZ-0X7jDx8pyfDsQoyx3FbB5i4uqvNoCVYXhrQHA&oe=6635A5AF"} />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Yo! Wazzup mananap?</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};

export default Message;