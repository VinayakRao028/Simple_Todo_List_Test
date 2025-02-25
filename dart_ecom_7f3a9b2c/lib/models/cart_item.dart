import 'package:meta/meta.dart';

@immutable
class CartItemModel {
  static const String id = 'id';
  static const String name = 'name';
  static const String image = 'image';
  static const String productId = 'productId';
  static const String price = 'price';
  static const String size = 'size';
  static const String color = 'color';

  final String _id;
  final String _name;
  final String _image;
  final String _productId;
  final String _size;
  final String _color;
  final int _price;

  const CartItemModel({
    required String id,
    required String name,
    required String image,
    required String productId,
    required String size,
    required String color,
    required int price,
  })  : _id = id,
        _name = name,
        _image = image,
        _productId = productId,
        _size = size,
        _color = color,
        _price = price;

  String get id => _id;
  String get name => _name;
  String get image => _image;
  String get productId => _productId;
  String get size => _size;
  String get color => _color;
  int get price => _price;

  factory CartItemModel.fromMap(Map<String, dynamic> data) {
    return CartItemModel(
      id: data[id] as String,
      name: data[name] as String,
      image: data[image] as String,
      productId: data[productId] as String,
      price: data[price] as int,
      size: data[size] as String,
      color: data[color] as String,
    );
  }

  Map<String, dynamic> toMap() => {
        id: _id,
        image: _image,
        name: _name,
        productId: _productId,
        price: _price,
        size: _size,
        color: _color,
      };

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CartItemModel &&
          runtimeType == other.runtimeType &&
          _id == other._id &&
          _name == other._name &&
          _image == other._image &&
          _productId == other._productId &&
          _size == other._size &&
          _color == other._color &&
          _price == other._price;

  @override
  int get hashCode =>
      _id.hashCode ^
      _name.hashCode ^
      _image.hashCode ^
      _productId.hashCode ^
      _size.hashCode ^
      _color.hashCode ^
      _price.hashCode;
}