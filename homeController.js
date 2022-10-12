const homeController = async () => {
    try{
        const reponse = await fetch ('./stock.json')
        const data = await reponse.json();

        return data;
    } catch (error) {
        console.log('Hubo un error', error)
    }
};

export { homeController };