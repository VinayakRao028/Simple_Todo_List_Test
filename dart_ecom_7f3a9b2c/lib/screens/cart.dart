import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';

import '../helpers/style.dart';
import '../models/cart_item.dart';
import '../provider/app.dart';
import '../provider/user.dart';
import '../services/order.dart';
import '../widgets/custom_text.dart';
import '../widgets/loading.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({Key? key}) : super(key: key);

  @override
  _CartScreenState createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final _key = GlobalKey<ScaffoldState>();
  final OrderServices _orderServices = OrderServices();

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final appProvider = Provider.of<AppProvider>(context);

    return Scaffold(
      key: _key,
      appBar: AppBar(
        iconTheme: const IconThemeData(color: black),
        backgroundColor: white,
        elevation: 0.0,
        title: const CustomText(text: "Shopping Cart"),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      backgroundColor: white,
      body: appProvider.isLoading
          ? const Loading()
          : ListView.builder(
              itemCount: userProvider.userModel.cart.length,
              itemBuilder: (_, index) {
                return Padding(
                  padding: const EdgeInsets.all(16),
                  child: Container(
                    height: 120,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      color: white,
                      boxShadow: [
                        BoxShadow(
                          color: red.withOpacity(0.2),
                          offset: const Offset(3, 2),
                          blurRadius: 30,
                        )
                      ],
                    ),
                    child: Row(
                      children: <Widget>[
                        ClipRRect(
                          borderRadius: const BorderRadius.only(
                            bottomLeft: Radius.circular(20),
                            topLeft: Radius.circular(20),
                          ),
                          child: Image.network(
                            userProvider.userModel.cart[index].image,
                            height: 120,
                            width: 140,
                            fit: BoxFit.fill,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              RichText(
                                text: TextSpan(
                                  children: [
                                    TextSpan(
                                      text: userProvider.userModel.cart[index].name + "\n",
                                      style: const TextStyle(
                                        color: black,
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: "\$${userProvider.userModel.cart[index].price / 100} \n\n",
                                      style: const TextStyle(
                                        color: black,
                                        fontSize: 18,
                                        fontWeight: FontWeight.w300,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              IconButton(
                                icon: const Icon(
                                  Icons.delete,
                                  color: red,
                                ),
                                onPressed: () async {
                                  appProvider.changeIsLoading();
                                  bool success = await userProvider.removeFromCart(
                                    cartItem: userProvider.userModel.cart[index],
                                  );
                                  if (success) {
                                    userProvider.reloadUserModel();
                                    print("Item removed from cart");
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(content: Text("Removed from Cart!")),
                                    );
                                    appProvider.changeIsLoading();
                                  } else {
                                    appProvider.changeIsLoading();
                                  }
                                },
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                );
              },
            ),
      bottomNavigationBar: Container(
        height: 70,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              RichText(
                text: TextSpan(
                  children: [
                    const TextSpan(
                      text: "Total: ",
                      style: TextStyle(
                        color: grey,
                        fontSize: 22,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    TextSpan(
                      text: " \$${userProvider.userModel.totalCartPrice / 100}",
                      style: const TextStyle(
                        color: black,
                        fontSize: 22,
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: black,
                ),
                child: TextButton(
                  onPressed: () {
                    if (userProvider.userModel.totalCartPrice == 0) {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20.0),
                            ),
                            content: SizedBox(
                              height: 200,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: const [
                                  Text(
                                    'Your cart is empty',
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      );
                      return;
                    }
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          content: SizedBox(
                            height: 200,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'You will be charged \$${userProvider.userModel.totalCartPrice / 100} upon delivery!',
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 20),
                                SizedBox(
                                  width: 320.0,
                                  child: ElevatedButton(
                                    onPressed: () async {
                                      var uuid = const Uuid();
                                      String id = uuid.v4();
                                      await _orderServices.createOrder(
                                        userId: userProvider.user.uid,
                                        id: id,
                                        description: "Some random description",
                                        status: "complete",
                                        totalPrice: userProvider.userModel.totalCartPrice,
                                        cart: userProvider.userModel.cart,
                                      );
                                      for (CartItemModel cartItem in userProvider.userModel.cart) {
                                        bool value = await userProvider.removeFromCart(cartItem: cartItem);
                                        if (value) {
                                          userProvider.reloadUserModel();
                                          print("Item removed from cart");
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            const SnackBar(content: Text("Removed from Cart!")),
                                          );
                                        } else {
                                          print("ITEM WAS NOT REMOVED");
                                        }
                                      }
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text("Order created!")),
                                      );
                                      Navigator.pop(context);
                                    },
                                    child: const Text(
                                      "Accept",
                                      style: TextStyle(color: Colors.white),
                                    ),
                                    style: ElevatedButton.styleFrom(
                                      primary: const Color(0xFF1BC0C5),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 10),
                                SizedBox(
                                  width: 320.0,
                                  child: ElevatedButton(
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: const Text(
                                      "Reject",
                                      style: TextStyle(color: Colors.white),
                                    ),
                                    style: ElevatedButton.styleFrom(primary: red),
                                  ),
                                )
                              ],
                            ),
                          ),
                        );
                      },
                    );
                  },
                  child: const CustomText(
                    text: "Check out",
                    size: 20,
                    color: white,
                    weight: FontWeight.normal,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}