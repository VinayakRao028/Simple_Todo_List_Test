import 'package:chat_app/provider/app.dart';
import 'package:chat_app/provider/product.dart';
import 'package:chat_app/provider/user.dart';
import 'package:chat_app/screens/home.dart';
import 'package:chat_app/screens/login.dart';
import 'package:chat_app/screens/splash.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider.initialize()),
        ChangeNotifierProvider(create: (_) => ProductProvider.initialize()),
        ChangeNotifierProvider(create: (_) => AppProvider()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primaryColor: Colors.white,
        ),
        home: const ScreensController(),
      ),
    ),
  );
}

class ScreensController extends StatelessWidget {
  const ScreensController({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    switch (user.status) {
      case Status.Uninitialized:
        return const Splash();
      case Status.Unauthenticated:
      case Status.Authenticating:
        return const Login();
      case Status.Authenticated:
        return const HomePage();
      default:
        return const Login();
    }
  }
}