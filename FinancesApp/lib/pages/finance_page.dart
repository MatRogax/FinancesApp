import 'package:finances/pages/finance_formatters.dart';
import 'package:finances/utils/constants.dart';
import 'package:finances/widgets/ContainerField.dart';
import 'package:finances/widgets/WidgetTextField.dart';
import 'package:flutter/material.dart';

class FinanceApp extends StatefulWidget {
  const FinanceApp({super.key});

  @override
  State<FinanceApp> createState() => _FinanceAppState();
}

class _FinanceAppState extends State<FinanceApp> {
  TextEditingController searchFieldController = TextEditingController(text: "");
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: SizedBox(
          height: size.height * 2,
          child: Column(
            children: [
              Container(
                height: size.height * 0.3,
                color: Colors.green,
                child: Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: size.height * 0.02,
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Text(
                              "Finances App",
                              style: TextStyle(
                                color: maskInbackgroundColor,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Icon(
                              Icons.circle_notifications_sharp,
                              size: 35,
                              color: maskInbackgroundColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                        top: size.height * 0.025,
                      ),
                      child: ContainerField(
                        backgroundField: maskInbackgroundColor,
                        size: size,
                        child: WidgetTextField(
                          labeltext: "Buscar...",
                          prefixFieldIcon: const Icon(Icons.search),
                          controllerText: searchFieldController,
                          inputType: TextInputType.text,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.blue,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              onPressed: () => null,
              icon: Icon(
                Icons.home,
                color: Colors.red,
              ),
            ),
            IconButton(
              onPressed: () => null,
              icon: Icon(
                Icons.home,
                color: Colors.red,
              ),
            ),
            IconButton(
              onPressed: () => null,
              icon: Icon(
                Icons.home,
                color: Colors.red,
              ),
            ),
            IconButton(
              onPressed: () => null,
              icon: Icon(
                Icons.home,
                color: Colors.red,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
