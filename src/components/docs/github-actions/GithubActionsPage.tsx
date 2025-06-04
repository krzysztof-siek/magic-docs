import React from "react";
import { TextBlock } from "../../tools/TextBlock";
import { CodeSnippet } from "../../tools/CodeSnippet";
import { Quiz } from "../../tools/Quiz";
import { Resources } from "../../tools/Resources";
import { MermaidDiagram } from "../../tools/MermaidDiagram";

export const GithubActionsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className='text-4xl font-bold mb-8 text-white'>
        Github Actions: Automatyzacja przepływu pracy w repozytoriach
      </h1>

      {/* Problem Space */}
      <TextBlock
        header="Dlaczego Github Actions?"
        text={`
          Github Actions to potężne narzędzie do automatyzacji przepływu pracy (workflow) w repozytoriach. 
          Przed jego powstaniem, deweloperzy musieli korzystać z zewnętrznych narzędzi CI/CD i integrować je 
          z repozytoriami. Github Actions rozwiązuje ten problem, oferując zintegrowane rozwiązanie 
          bezpośrednio w ekosystemie GitHub, umożliwiając automatyzację testów, deploymentu i innych zadań 
          bezpośrednio z poziomu repozytorium.
        `}
      />

      <TextBlock
        header="Kluczowe Koncepcje"
        text={`
          Github Actions opiera się na kilku fundamentalnych konceptach:
          - Workflow: Automatyczny proces składający się z jednego lub więcej jobs
          - Event: Zdarzenie, które wyzwala workflow (np. push, pull request)
          - Job: Zestaw kroków wykonywanych na tym samym runnerze
          - Step: Pojedyncze zadanie w ramach job
          - Action: Najmniejsza, wielokrotnego użytku jednostka w workflow
        `}
      />

      {/* Architecture Diagram */}
      <MermaidDiagram
        diagramPath="/diagrams/github-actions-flow.mmd"
        caption="Architektura i przepływ pracy Github Actions"
      />

      {/* Implementation Example */}
      <TextBlock
        header="Implementacja Github Actions"
        text={`
          Workflow w Github Actions definiujemy w plikach YAML, które znajdują się w katalogu .github/workflows 
          naszego repozytorium. Każdy workflow może być wyzwalany przez różne zdarzenia i wykonywać 
          zdefiniowane zadania.
        `}
      />

      <CodeSnippet
        fileName="ci.yml"
        language="yaml"
        code={`
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
        `}
      />

      <CodeSnippet
        fileName="deploy.yml"
        language="yaml"
        code={`
name: Deploy to Production

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1
          
      - name: Build and Deploy
        run: |
          npm install
          npm run build
          aws s3 sync build/ s3://my-bucket/
        `}
      />

      {/* Quiz Section */}
      <Quiz
        title="Sprawdź swoją wiedzę o Github Actions"
        question={{
          question: "Co to jest workflow w Github Actions?",
          options: [
            { id: "A", text: "Pojedynczy skrypt automatyzujący" },
            { id: "B", text: "Automatyczny proces składający się z jednego lub więcej jobs" },
            { id: "C", text: "Narzędzie do zarządzania repozytorium" },
            { id: "D", text: "System kontroli wersji" }
          ],
          correctAnswer: "B",
          explanation: "Workflow to automatyczny proces w Github Actions, który może zawierać wiele jobów i kroków, uruchamianych w odpowiedzi na określone zdarzenia."
        }}
      />

      <Quiz
        title="Zaawansowane koncepcje Github Actions"
        question={{
          question: "Gdzie należy umieścić pliki konfiguracyjne workflow?",
          options: [
            { id: "A", text: "W katalogu /workflows" },
            { id: "B", text: "W katalogu /.github/actions" },
            { id: "C", text: "W katalogu /.github/workflows" },
            { id: "D", text: "W głównym katalogu repozytorium" }
          ],
          correctAnswer: "C",
          explanation: "Pliki konfiguracyjne workflow muszą być umieszczone w katalogu .github/workflows/"
        }}
      />

      {/* Resources */}
      <Resources
        title="Dodatkowe Materiały"
        links={[
          {
            title: "Oficjalna Dokumentacja Github Actions",
            url: "https://docs.github.com/en/actions",
            description: "Kompletna dokumentacja wszystkich funkcji i możliwości Github Actions."
          },
          {
            title: "Github Actions Marketplace",
            url: "https://github.com/marketplace?type=actions",
            description: "Zbiór gotowych akcji, które możesz wykorzystać w swoich workflow."
          },
          {
            title: "Github Actions Starter Workflows",
            url: "https://github.com/actions/starter-workflows",
            description: "Przykładowe workflow dla różnych języków i frameworków."
          }
        ]}
      />
    </div>
  );
};

export default GithubActionsPage;
