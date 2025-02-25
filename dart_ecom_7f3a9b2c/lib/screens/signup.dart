import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:dart_ecom_7f3a9b2c/helpers/common.dart';
import 'package:dart_ecom_7f3a9b2c/helpers/style.dart';
import 'package:dart_ecom_7f3a9b2c/provider/user.dart';
import 'package:dart_ecom_7f3a9b2c/widgets/loading.dart';
import 'package:dart_ecom_7f3a9b2c/screens/home.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  bool _hidePass = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);

    return Scaffold(
      key: _scaffoldKey,
      body: userProvider.status == Status.authenticating
          ? const Loading()
          : Stack(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(0),
                  child: Container(
                    decoration: BoxDecoration(
                      color: white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey[350]!,
                          blurRadius: 20.0,
                        )
                      ],
                    ),
                    child: Form(
                      key: _formKey,
                      child: ListView(
                        children: <Widget>[
                          const SizedBox(height: 40),
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Container(
                              alignment: Alignment.topCenter,
                              child: Image.asset(
                                'images/logo.png',
                                width: 260.0,
                              ),
                            ),
                          ),
                          _buildTextFormField(
                            controller: _nameController,
                            hintText: "Full name",
                            icon: Icons.person_outline,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "The name field cannot be empty";
                              }
                              return null;
                            },
                          ),
                          _buildTextFormField(
                            controller: _emailController,
                            hintText: "Email",
                            icon: Icons.alternate_email,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "The email field cannot be empty";
                              }
                              final emailRegex = RegExp(
                                r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$',
                              );
                              if (!emailRegex.hasMatch(value)) {
                                return 'Please enter a valid email address';
                              }
                              return null;
                            },
                          ),
                          _buildTextFormField(
                            controller: _passwordController,
                            hintText: "Password",
                            icon: Icons.lock_outline,
                            obscureText: _hidePass,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "The password field cannot be empty";
                              } else if (value.length < 6) {
                                return "The password must be at least 6 characters long";
                              }
                              return null;
                            },
                            suffixIcon: IconButton(
                              icon: Icon(_hidePass ? Icons.visibility_off : Icons.visibility),
                              onPressed: () {
                                setState(() {
                                  _hidePass = !_hidePass;
                                });
                              },
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(14.0, 8.0, 14.0, 8.0),
                            child: Material(
                              borderRadius: BorderRadius.circular(20.0),
                              color: Colors.black,
                              elevation: 0.0,
                              child: MaterialButton(
                                onPressed: () async {
                                  if (_formKey.currentState!.validate()) {
                                    final signUpSuccess = await userProvider.signUp(
                                      _nameController.text,
                                      _emailController.text,
                                      _passwordController.text,
                                    );
                                    if (!signUpSuccess) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text("Sign up failed")),
                                      );
                                      return;
                                    }
                                    Navigator.pushReplacement(
                                      context,
                                      MaterialPageRoute(builder: (context) => const HomePage()),
                                    );
                                  }
                                },
                                minWidth: MediaQuery.of(context).size.width,
                                child: const Text(
                                  "Sign up",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20.0,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: InkWell(
                              onTap: () {
                                Navigator.pop(context);
                              },
                              child: const Text(
                                "I already have an account",
                                textAlign: TextAlign.center,
                                style: TextStyle(color: Colors.black, fontSize: 16),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildTextFormField({
    required TextEditingController controller,
    required String hintText,
    required IconData icon,
    required String? Function(String?) validator,
    bool obscureText = false,
    Widget? suffixIcon,
  }) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(14.0, 8.0, 14.0, 8.0),
      child: Material(
        borderRadius: BorderRadius.circular(10.0),
        color: Colors.grey.withOpacity(0.2),
        elevation: 0.0,
        child: Padding(
          padding: const EdgeInsets.only(left: 12.0),
          child: TextFormField(
            controller: controller,
            obscureText: obscureText,
            decoration: InputDecoration(
              hintText: hintText,
              icon: Icon(icon),
              border: InputBorder.none,
              suffixIcon: suffixIcon,
            ),
            validator: validator,
          ),
        ),
      ),
    );
  }
}