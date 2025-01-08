
const MenuItem = ({item}) => {
    const{name,recipe,image,price}=item
    return (
        <div className="flex space-x-2">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
            <div>
                <h2 className="uppercase text-[#151515]">{name}---------------</h2>
                <p className="text-[#737373]">{recipe}</p>
            </div>
            <p className="text-yellow-600">${price}</p>
        </div>
    );
};

export default MenuItem;