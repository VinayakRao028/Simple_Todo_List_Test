import 'package:cloud_firestore/cloud_firestore.dart';
import 'cart_item.dart';

class UserModel {
  static const String id = "uid";
  static const String name = "name";
  static const String email = "email";
  static const String stripeId = "stripeId";
  static const String cart = "cart";

  final String _name;
  final String _email;
  final String _id;
  final String _stripeId;
  int _priceSum = 0;

  // Getters
  String get name => _name;
  String get email => _email;
  String get id => _id;
  String get stripeId => _stripeId;

  // Public variables
  List<CartItemModel> cart;
  int totalCartPrice;

  UserModel.fromSnapshot(DocumentSnapshot snapshot)
      : _name = snapshot.get(name) as String,
        _email = snapshot.get(email) as String,
        _id = snapshot.get(id) as String,
        _stripeId = snapshot.get(stripeId) as String? ?? "",
        cart = _convertCartItems(snapshot.get(cart) as List<dynamic>? ?? []),
        totalCartPrice = snapshot.get(cart) == null
            ? 0
            : _getTotalPrice(cart: snapshot.get(cart) as List<dynamic>);

  static List<CartItemModel> _convertCartItems(List<dynamic> cart) {
    return cart.map((cartItem) => CartItemModel.fromMap(cartItem as Map<String, dynamic>)).toList();
  }

  static int _getTotalPrice({required List<dynamic> cart}) {
    int priceSum = 0;
    for (var cartItem in cart) {
      priceSum += (cartItem["price"] as int);
    }
    return priceSum;
  }
}