using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>()
            .ForMember(x => x.ProductType, o => o.MapFrom(o => o.ProductType.Name))
            .ForMember(x => x.ProductBrand, o => o.MapFrom(o => o.ProductBrand.Name))
            .ForMember(x => x.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();

            CreateMap<CustomerBasketDto, CustomerBasket>();

            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}