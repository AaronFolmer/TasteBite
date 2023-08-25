import FormSearch from '../../components/FormSearch'

function MainCenter() {
    return(
        <>
            <div className="absolute z-10 m-48">
                <h1 className="font-serif text-7xl text-white font-bold">
                    Descubra as melhores mordidas<br/>na sua cidade!
                </h1>
                <FormSearch/>
            </div>
        </>
    )
}

export default MainCenter