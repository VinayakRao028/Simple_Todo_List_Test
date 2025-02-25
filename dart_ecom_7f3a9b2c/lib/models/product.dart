import 'package:cloud_firestore/cloud_firestore.dart';

class ProductModel {
  static const String id = "id";
  static const String name = "name";
  static const String picture = "picture";
  static const String price = "price";
  static const String description = "description";
  static const String category = "category";
  static const String featured = "featured";
  static const String quantity = "quantity";
  static const String brand = "brand";
  static const String sale = "sale";
  static const String sizes = "sizes";
  static const String colors = "colors";

  final String _id;
  final String _name;
  final String _picture;
  final String _description;
  final String _category;
  final String _brand;
  final int _quantity;
  final int _price;
  final bool _sale;
  final bool _featured;
  final List<dynamic> _colors;
  final List<dynamic> _sizes;

  String get id => _id;
  String get name => _name;
  String get picture => _picture;
  String get brand => _brand;
  String get category => _category;
  String get description => _description;
  int get quantity => _quantity;
  int get price => _price;
  bool get featured => _featured;
  bool get sale => _sale;
  List<dynamic> get colors => _colors;
  List<dynamic> get sizes => _sizes;

  ProductModel.fromSnapshot(DocumentSnapshot snapshot)
      : _id = snapshot.get(id) as String,
        _brand = snapshot.get(brand) as String,
        _sale = snapshot.get(sale) as bool,
        _description = snapshot.get(description) as String? ?? "",
        _featured = snapshot.get(featured) as bool,
        _price = (snapshot.get(price) as num).floor(),
        _category = snapshot.get(category) as String,
        _colors = snapshot.get(colors) as List<dynamic>,
        _sizes = snapshot.get(sizes) as List<dynamic>,
        _name = snapshot.get(name) as String,
        _picture = snapshot.get(picture) as String,
        _quantity = snapshot.get(quantity) as int;
}