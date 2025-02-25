import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/user.dart';
import '../provider/user.dart';
import '../helpers/style.dart';
import '../widgets/custom_text.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        backgroundColor: primary,
      ),
      body: Consumer<UserProvider>(
        builder: (context, userProvider, child) {
          if (userProvider.status == Status.Authenticated) {
            return _buildProfileContent(userProvider.userModel);
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  Widget _buildProfileContent(UserModel user) {
    return ListView(
      padding: EdgeInsets.all(16.0),
      children: [
        CircleAvatar(
          radius: 50,
          backgroundColor: primary,
          child: Icon(Icons.person, size: 50, color: white),
        ),
        SizedBox(height: 16),
        CustomText(
          text: user.name ?? 'N/A',
          size: 24,
          weight: FontWeight.bold,
        ),
        SizedBox(height: 8),
        CustomText(
          text: user.email ?? 'N/A',
          size: 16,
          color: grey,
        ),
        SizedBox(height: 24),
        _buildProfileOption(
          icon: Icons.edit,
          title: 'Edit Profile',
          onTap: () {
            // TODO: Implement edit profile functionality
          },
        ),
        _buildProfileOption(
          icon: Icons.history,
          title: 'Order History',
          onTap: () {
            // TODO: Navigate to order history screen
          },
        ),
        _buildProfileOption(
          icon: Icons.settings,
          title: 'Settings',
          onTap: () {
            // TODO: Navigate to settings screen
          },
        ),
        _buildProfileOption(
          icon: Icons.exit_to_app,
          title: 'Logout',
          onTap: () {
            Provider.of<UserProvider>(context, listen: false).signOut();
            Navigator.of(context).pushReplacementNamed('/login');
          },
        ),
      ],
    );
  }

  Widget _buildProfileOption({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: primary),
      title: Text(title),
      trailing: Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}