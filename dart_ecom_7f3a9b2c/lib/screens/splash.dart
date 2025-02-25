import 'package:flutter/material.dart';
import 'package:dart_ecom_7f3a9b2c/widgets/loading.dart';

class Splash extends StatelessWidget {
  const Splash({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Loading(),
      ),
    );
  }
}