const items = [
    {
        "id": "002",
        "image": "../wasteExchange/images/2.jpg",
        "company": "Recycled Plastics Ltd.",
        "item_name": "Plastic Bottles Scrap",
        "current_price": "45",
        "discount_percentage": 30,
        "return_period": 10,
        "delivery_date": "15 Oct 2023",
        "rating": {
            "Material": "plastic",
            "type": "bottles",
        }
    },
    {
        "id": "003",
        "image": "../wasteExchange/images/3.jpg",
        "company": "Green Metal Co.",
        "item_name": "Aluminum Cans Scrap",
        "current_price": "70",
        "discount_percentage": 20,
        "return_period": 7,
        "delivery_date": "20 Oct 2023",
        "rating": {
            "Material": "aluminum",
            "type": "cans",
        }
    },
    {
        "id": "004",
        "image": "../wasteExchange/images/1.jpg",
        "company": "EcoWood Traders",
        "item_name": "Wood Pallets Scrap",
        "current_price": "30",
        "discount_percentage": 25,
        "return_period": 14,
        "delivery_date": "18 Oct 2023",
        "rating": {
            "Material": "wood",
            "type": "pallets",
        }
    },
    {
        "id": "005",
        "image": "../wasteExchange/images/5.jpg",
        "company": "Glass Recycle Inc.",
        "item_name": "Broken Glass Scrap",
        "current_price": "50",
        "discount_percentage": 15,
        "return_period": 5,
        "delivery_date": "25 Oct 2023",
        "rating": {
            "Material": "glass",
            "type": "broken pieces",
        }
    },
    {
        "id": "006",
        "image": "../wasteExchange/images/5.jpg",
        "company": "Textile Reuse Group",
        "item_name": "Old Clothes Scrap",
        "current_price": "35",
        "discount_percentage": 40,
        "return_period": 12,
        "delivery_date": "22 Oct 2023",
        "rating": {
            "Material": "textile",
            "type": "clothes",
        }
    },
    {
        "id": "007",
        "image": "../wasteExchange/images/7.jpg",
        "company": "Paper Recycling Ltd.",
        "item_name": "Used Paper Scrap",
        "current_price": "20",
        "discount_percentage": 50,
        "return_period": 10,
        "delivery_date": "30 Oct 2023",
        "rating": {
            "Material": "paper",
            "type": "used sheets",
        }
    },
    {
        "id": "008",
        "image": "../wasteExchange/images/8.jpg",
        "company": "Copper Reclaimers",
        "item_name": "Copper Wire Scrap",
        "current_price": "80",
        "discount_percentage": 18,
        "return_period": 8,
        "delivery_date": "28 Oct 2023",
        "rating": {
            "Material": "copper",
            "type": "wires",
        }
    },
    {
        "id": "009",
        "image": "../wasteExchange/images/9.jpg",
        "company": "Electronic Salvage",
        "item_name": "E-Waste Scrap",
        "current_price": "90",
        "discount_percentage": 22,
        "return_period": 14,
        "delivery_date": "05 Nov 2023",
        "rating": {
            "Material": "electronic",
            "type": "various",
        }
    },
    {
        "id": "010",
        "image": "../wasteExchange/images/1.jpg",
        "company": "Rubber Reclaimers",
        "item_name": "Used Tires Scrap",
        "current_price": "55",
        "discount_percentage": 28,
        "return_period": 7,
        "delivery_date": "12 Nov 2023",
        "rating": {
            "Material": "rubber",
            "type": "tires",
        }
    },
    {
        "id": "011",
        "image": "../wasteExchange/images/2.jpg",
        "company": "Battery Recycling Co.",
        "item_name": "Old Batteries Scrap",
        "current_price": "65",
        "discount_percentage": 12,
        "return_period": 6,
        "delivery_date": "20 Nov 2023",
        "rating": {
            "Material": "battery",
            "type": "various",
        }
    },
    {
        "id": "012",
        "image": "../wasteExchange/images/3.jpg",
        "company": "Plastic Waste Management",
        "item_name": "Plastic Bags Scrap",
        "current_price": "25",
        "discount_percentage": 35,
        "return_period": 10,
        "delivery_date": "01 Dec 2023",
        "rating": {
            "Material": "plastic",
            "type": "bags",
        }
    },
    {
        "id": "013",
        "image": "../wasteExchange/images/5.jpg",
        "company": "Metal Recovery Ltd.",
        "item_name": "Steel Beams Scrap",
        "current_price": "85",
        "discount_percentage": 27,
        "return_period": 15,
        "delivery_date": "10 Dec 2023",
        "rating": {
            "Material": "steel",
            "type": "beams",
        }
    },
    {
        "id": "014",
        "image": "../wasteExchange/images/5.jpg",
        "company": "Organic Waste Solutions",
        "item_name": "Organic Waste Scrap",
        "current_price": "15",
        "discount_percentage": 50,
        "return_period": 5,
        "delivery_date": "07 Oct 2023",
        "rating": {
            "Material": "organic",
            "type": "compost",
        }
    },
    {
        "id": "015",
        "image": "../wasteExchange/images/7.jpg",
        "company": "Ceramic Recyclers",
        "item_name": "Ceramic Fragments Scrap",
        "current_price": "40",
        "discount_percentage": 33,
        "return_period": 9,
        "delivery_date": "18 Oct 2023",
        "rating": {
            "Material": "ceramic",
            "type": "fragments",
        }
    },
    {
        "id": "016",
        "image": "../wasteExchange/images/8.jpg",
        "company": "Battery Recovery Group",
        "item_name": "Lead Acid Batteries Scrap",
        "current_price": "95",
        "discount_percentage": 10,
        "return_period": 6,
        "delivery_date": "25 Oct 2023",
        "rating": {
            "Material": "lead acid",
            "type": "batteries",
        }
    },
    {
        "id": "017",
        "image": "../wasteExchange/images/9.jpg",
        "company": "Iron Salvage Co.",
        "item_name": "Iron Pipes Scrap",
        "current_price": "65",
        "discount_percentage": 20,
        "return_period": 12,
        "delivery_date": "01 Nov 2023",
        "rating": {
            "Material": "iron",
            "type": "pipes",
        }
    },
    {
        "id": "018",
        "image": "../wasteExchange/images/5.jpg",
        "company": "Paper Waste Ltd.",
        "item_name": "Cardboard Scrap",
        "current_price": "30",
        "discount_percentage": 45,
        "return_period": 7,
        "delivery_date": "08 Nov 2023",
        "rating": {
            "Material": "paper",
            "type": "cardboard",
        }
    },
    {
        "id": "019",
        "image": "../wasteExchange/images/7.jpg",
        "company": "Plastic Recovery Inc.",
        "item_name": "Plastic Wrap Scrap",
        "current_price": "28",
        "discount_percentage": 38,
        "return_period": 15,
        "delivery_date": "12 Nov 2023",
        "rating": {
            "Material": "plastic",
            "type": "wrap",
        }
    },
    {
        "id": "020",
        "image": "../wasteExchange/images/9.jpg",
        "company": "Wood Recycling Co.",
        "item_name": "Wooden Planks Scrap",
        "current_price": "50",
        "discount_percentage": 32,
        "return_period": 10,
        "delivery_date": "20 Nov 2023",
        "rating": {
            "Material": "wood",
            "type": "planks",
        }
    }
    
];