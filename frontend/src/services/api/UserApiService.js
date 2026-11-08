import { getMockFavorites, getMockHotels, saveMockFavorites } from '../../data/mockData';

const findHotel = (hotelId) => getMockHotels().find((hotel) => String(hotel.id || hotel._id) === String(hotelId));

const UserApiService = {
  async getFavorites() {
    return { success: true, favorites: getMockFavorites().map(findHotel).filter(Boolean) };
  },
  async addFavorite(hotelId) {
    saveMockFavorites([...new Set([...getMockFavorites(), hotelId])]);
    return { success: true };
  },
  async removeFavorite(hotelId) {
    saveMockFavorites(getMockFavorites().filter((id) => String(id) !== String(hotelId)));
    return { success: true };
  }
};

export default UserApiService;
