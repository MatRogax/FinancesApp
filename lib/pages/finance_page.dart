import 'package:finances/utils/constants.dart';
import 'package:flutter/material.dart';

class FinanceApp extends StatefulWidget {
  const FinanceApp({super.key});

  @override
  State<FinanceApp> createState() => _FinanceAppState();
}

class _FinanceAppState extends State<FinanceApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Finance App',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                        ),
                      ),
                      SizedBox(
                        height: 8,
                      ),
                      Text(
                        'data atual',
                        style: TextStyle(
                          color: primaryColor,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(50),
                      color: containsColor,
                    ),
                    padding: const EdgeInsets.all(12),
                    child: const Icon(
                      Icons.notifications_none_rounded,
                      color: Color.fromARGB(255, 124, 124, 124),
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 25,
              ),
              //Pesquisar por data
              Container(
                decoration: BoxDecoration(color: containsColor, borderRadius: BorderRadius.circular(12)),
                padding: EdgeInsets.all(12),
                child: const Row(
                  children: [
                    Icon(
                      Icons.search,
                      color: textPrimaryColor,
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Text(
                      "search",
                      style: TextStyle(color: textPrimaryColor),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 25),
              //implementar calendario mensal
            ],
          ),
        ),
      ),
    );
  }
}
