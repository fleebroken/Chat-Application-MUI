const Conversation = () => {
  return (
    <>
        <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/317870211_8371882942884370_5656338546419061213_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7qYWcWG_h6sQ7kNvgE3iEBO&_nc_ht=scontent.fmnl17-3.fna&oh=00_AfDwPKtRfBRZCCLPSXjC9WZ3ezRd4tJIMbtd2L4CB1YVeA&oe=6635A5AF" alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1 ">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">John Abz</p>
                    <span className="text-xl">🎃</span>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1" />


    </>
  )
}

export default Conversation