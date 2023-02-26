import axios from "axios";

const URL = 'https://pixabay.com/api/';

export const getImages = async (imageName, pageNumber) => {
    try {
        return await axios.get(URL, {
        params: {
            key: '33913920-2ed363835b555a522d2b5db48',
            q: imageName,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: pageNumber,
        }
    })
    } catch (error) {
      console.log(error);  
    }
};
