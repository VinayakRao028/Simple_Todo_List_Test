import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:dart_ecom_7f3a9b2c/helpers/style.dart';
import 'package:dart_ecom_7f3a9b2c/models/order.dart';
import 'package:dart_ecom_7f3a9b2c/provider/user.dart';
import 'package:dart_ecom_7f3a9b2c/widgets/custom_text.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: black),
        backgroundColor: white,
        elevation: 0.0,
        title: const CustomText(text: "Orders"),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      backgroundColor: white,
      body: ListView.builder(
        itemCount: userProvider.orders.length,
        itemBuilder: (context, index) {
          OrderModel order = userProvider.orders[index];
          return ListTile(
            leading: CustomText(
              text: "\$${order.total / 100}",
              weight: FontWeight.bold,
            ),
            title: Text(order.description),
            subtitle: Text(
              DateTime.fromMillisecondsSinceEpoch(order.createdAt).toString(),
            ),
            trailing: CustomText(text: order.status, color: green),
          );
        },
      ),
    );
  }
}