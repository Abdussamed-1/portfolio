import type { Locale } from "@/resources/translations";

const content: Record<string, { en: string; tr: string }> = {
  "qaoa-project": {
    en: `## Project Overview

This project implements the **Quantum Approximate Optimization Algorithm (QAOA)** to solve a bipartite graph maximum cut problem, specifically applied to donor-recipient matching scenarios. The implementation uses Qiskit and IBM Quantum services to run quantum circuits.

The problem is formulated as a bipartite graph where:
- Nodes are divided into two sets: donors and recipients
- Edges represent potential matches with associated weights
- The goal is to find the optimal matching that maximizes the total weight of the cut

## Key Features

- Implementation of QAOA algorithm for quantum optimization
- Support for both local simulation and IBM Quantum backend execution
- Visualization of bipartite graphs and maximum cuts
- Cost function optimization using classical-quantum hybrid approach
- Integration with IBM Quantum services for real quantum hardware execution

## Project Structure

- \`Main.py\`: Main implementation file containing the core QAOA algorithm and graph construction
- \`simulator.py\`: Contains simulation-specific implementations and local testing capabilities
- \`Donör-Recipient/\`: Directory containing donor-recipient specific implementations
- \`main/\`: Additional implementation files and utilities

## Requirements

- Python 3.x
- Qiskit
- IBM Quantum Account
- NumPy, Matplotlib, Rustworkx, SciPy

## Usage

Install required packages:

\`\`\`bash
pip install qiskit qiskit-ibm-runtime numpy matplotlib rustworkx scipy
\`\`\`

Run the main implementation:

\`\`\`bash
python Main.py
\`\`\`

For local simulation:

\`\`\`bash
python simulator.py
\`\`\`

## Implementation Details

The project implements bipartite graph construction and visualization, cost Hamiltonian formulation, QAOA circuit construction, parameter optimization, and quantum circuit execution (both local and IBM Quantum).`,
    tr: `## Proje Özeti

Bu proje, verici-alıcı eşleştirme senaryolarına uygulanan ikili çizge (bipartite graph) maksimum kesit problemini çözmek için **Kuantum Yaklaşık Optimizasyon Algoritması (QAOA)** uygular. Uygulama, kuantum devrelerini çalıştırmak için Qiskit ve IBM Quantum servislerini kullanır.

Problem şu şekilde modellenir:
- Düğümler iki kümede toplanır: vericiler ve alıcılar
- Kenarlar ilişkili ağırlıklarla olası eşleşmeleri temsil eder
- Amaç, kesitin toplam ağırlığını en üst düzeye çıkaran optimal eşleştirmeyi bulmaktır

## Öne Çıkanlar

- Kuantum optimizasyonu için QAOA algoritması uygulaması
- Yerel simülasyon ve IBM Quantum backend desteği
- İkili çizge ve maksimum kesit görselleştirmesi
- Klasik-kuantum hibrit maliyet fonksiyonu optimizasyonu
- Gerçek kuantum donanımı için IBM Quantum entegrasyonu

## Proje Yapısı

- \`Main.py\`: Ana QAOA algoritması ve çizge yapısı
- \`simulator.py\`: Simülasyon ve yerel testler
- \`Donör-Recipient/\`: Verici-alıcı uygulamaları
- \`main/\`: Yardımcı dosyalar

## Gereksinimler

- Python 3.x
- Qiskit
- IBM Quantum hesabı
- NumPy, Matplotlib, Rustworkx, SciPy

## Kullanım

Paketleri yükleyin:

\`\`\`bash
pip install qiskit qiskit-ibm-runtime numpy matplotlib rustworkx scipy
\`\`\`

Ana uygulamayı çalıştırın:

\`\`\`bash
python Main.py
\`\`\`

Yerel simülasyon için:

\`\`\`bash
python simulator.py
\`\`\`

## Uygulama Detayları

Proje, ikili çizge kurulumu ve görselleştirme, maliyet Hamiltoniyeni, QAOA devre yapısı, parametre optimizasyonu ve kuantum devre çalıştırmasını (yerel ve IBM Quantum) içerir.`,
  },
  "machine-learning-with-ibm": {
    en: `## Overview

This repository contains projects and learning materials developed as part of the IBM Machine Learning training.

## Project Structure

### Final_Project_IBM

The final project of the IBM Machine Learning training:
- **Project-IBM.ipynb**: Main project notebook
- **Brain_Tumor.jpg**: Image data used in the project (Brain Tumor Detection)

### IBM - Machine Learning

Learning materials from the training:
- **Machine-Learning-Notebooks/**: Jupyter notebooks covering machine learning topics
- **Keras-With-IBM/**: Examples and applications with the Keras library

## Content

- Machine Learning Fundamentals
- Deep Learning
- Deep Learning Applications with Keras
- Final Project: Brain Tumor Detection

## Requirements

- Python 3.x
- Jupyter Notebook
- TensorFlow/Keras
- NumPy, Pandas, Matplotlib, Scikit-learn

## Usage

Clone the repository and install dependencies, then run Jupyter Notebook:

\`\`\`bash
git clone https://github.com/Abdussamed-1/Machine_Learning-with-IBM.git
pip install -r requirements.txt
jupyter notebook
\`\`\`

Open and run the relevant notebook (e.g. \`Final_Project_IBM/Project-IBM.ipynb\`).`,
    tr: `## Genel Bakış

Bu depo, IBM Makine Öğrenmesi eğitimi kapsamında geliştirilen projeleri ve öğrenme materyallerini içerir.

## Proje Yapısı

### Final_Project_IBM

IBM Makine Öğrenmesi eğitiminin final projesi:
- **Project-IBM.ipynb**: Ana proje defteri
- **Brain_Tumor.jpg**: Projede kullanılan görsel veri (Beyin Tümörü Tespiti)

### IBM - Machine Learning

Eğitimden materyaller:
- **Machine-Learning-Notebooks/**: Makine öğrenmesi konulu Jupyter defterleri
- **Keras-With-IBM/**: Keras ile örnekler ve uygulamalar

## İçerik

- Makine Öğrenmesi Temelleri
- Derin Öğrenme
- Keras ile Derin Öğrenme Uygulamaları
- Final Proje: Beyin Tümörü Tespiti

## Gereksinimler

- Python 3.x
- Jupyter Notebook
- TensorFlow/Keras
- NumPy, Pandas, Matplotlib, Scikit-learn

## Kullanım

Depoyu klonlayıp bağımlılıkları yükleyin, ardından Jupyter Notebook çalıştırın:

\`\`\`bash
git clone https://github.com/Abdussamed-1/Machine_Learning-with-IBM.git
pip install -r requirements.txt
jupyter notebook
\`\`\`

İlgili defteri açıp çalıştırın (örn. \`Final_Project_IBM/Project-IBM.ipynb\`).`,
  },
  "hi-kod-workshops": {
    en: `Workshop notebook content:

## Exercise 1

String, float, and integer type conversion and printing them with \`print\`.

## Exercise 2

Comparing values and printing logical operators with \`if\` / \`elif\` / \`else\`.

## Exercise 3

Asking the user for number input and performing basic operations (addition, subtraction, multiplication, division).

## Exercise 4

Getting name, age, city, and profession from the user and printing them.

## Exercise 5

- Splitting the phrase "Hi-Kod Veri Bilimi Atölyesi" with Python's \`split\` and accessing parts by index
- Listing numbers as odd and even and printing with \`print\``,
    tr: `Workshop not defteri içeriği:

## Alıştırma 1

String, float, integer ifadelerinin dönüşümü ve \`print\` ile yazdırılması.

## Alıştırma 2

Değerlerin karşılaştırılması ve mantıksal operatörlerin \`if\` / \`elif\` / \`else\` ile yazdırılması.

## Alıştırma 3

Kullanıcıdan sayı girişi alınması ve toplama, çıkarma, çarpma, bölme işlemlerinin yapılması.

## Alıştırma 4

Kullanıcıdan isim, yaş, şehir ve meslek alınması ve yazdırılması.

## Alıştırma 5

- "Hi-Kod Veri Bilimi Atölyesi" cümlesinin \`split\` ile ayrılması ve indexle erişim
- Rakamların tek ve çift olarak listelenip \`print\` ile yazdırılması`,
  },
  huaweict: {
    en: `## Huawei Cloud AI Health Assistant

A cloud-native medical diagnostic assistant built on Huawei Cloud infrastructure, featuring **Milvus GraphRAG** and **Agentic RAG** architectures.

## Architecture Overview

The application follows a cloud-based microservices architecture on Huawei Cloud:

- **User layer** → **ELB (Elastic Load Balancer)** → **Application Server (ECS)** with Input Processing, Agentic Orchestrator, Context Integration
- **Intelligence Layer (ModelArts)**: DeepSeek v3.1 model with Ascend chips
- **Data & Memory Layer**: Milvus (vector & graph DB), OBS Object Storage

## Core Features

- **Medical Diagnostic Assistance**: AI-powered support for doctors
- **Multi-layered RAG**: Vector search + graph-based retrieval (GraphRAG)
- **Agentic Reasoning**: Task planning and multi-step reasoning
- **Cloud-Native**: ECS, ModelArts, Milvus, OBS, ELB

## Project Structure

- \`app.py\` — Streamlit UI
- \`rag_service.py\` — Main RAG orchestrator
- \`input_processing.py\` — Preprocessing
- \`agentic_orchestrator.py\` — Agentic RAG task planner
- \`context_integration.py\` — Milvus & GraphRAG integration
- \`config.py\`, \`requirements.txt\`

## Running Locally

\`\`\`bash
pip install -r requirements.txt
streamlit run app.py
\`\`\`

Application runs at \`http://localhost:8501\`. Configure \`.env\` with DeepSeek/Milvus/OBS credentials (see repo \`.env.example\`).

## Note

This application is a diagnostic support tool for medical professionals and should not replace professional medical judgment.`,
    tr: `## Huawei Cloud AI Sağlık Asistanı

Huawei Cloud altyapısında **Milvus GraphRAG** ve **Agentic RAG** mimarileriyle geliştirilmiş bulut tabanlı tıbbi tanı asistanı.

## Mimari Özeti

Uygulama, Huawei Cloud üzerinde mikroservis mimarisi kullanır:

- **Kullanıcı katmanı** → **ELB** → **Uygulama sunucusu (ECS)**: Girdi işleme, Agentic Orchestrator, bağlam entegrasyonu
- **Zeka katmanı (ModelArts)**: Ascend çipleriyle DeepSeek v3.1
- **Veri ve bellek katmanı**: Milvus (vektör ve çizge DB), OBS depolama

## Özellikler

- **Tıbbi tanı desteği**: Hekimler için yapay zeka destekli asistan
- **Çok katmanlı RAG**: Vektör arama ve çizge tabanlı erişim (GraphRAG)
- **Agentic akıl yürütme**: Görev planlama ve çok adımlı mantık
- **Bulut tabanlı**: ECS, ModelArts, Milvus, OBS, ELB

## Proje Yapısı

- \`app.py\` — Streamlit arayüzü
- \`rag_service.py\` — Ana RAG orkestratörü
- \`input_processing.py\` — Ön işleme
- \`agentic_orchestrator.py\` — Agentic RAG görev planlayıcı
- \`context_integration.py\` — Milvus ve GraphRAG entegrasyonu
- \`config.py\`, \`requirements.txt\`

## Yerel Çalıştırma

\`\`\`bash
pip install -r requirements.txt
streamlit run app.py
\`\`\`

Uygulama \`http://localhost:8501\` adresinde çalışır. DeepSeek/Milvus/OBS bilgileri için \`.env\` dosyasını yapılandırın (repo’daki \`.env.example\`).

## Not

Bu uygulama, hekimler için tanı destek aracıdır ve profesyonel tıbbi değerlendirmenin yerini almamalıdır.`,
  },
};

export function getProjectContent(slug: string, locale: Locale): string {
  const entry = content[slug];
  if (!entry) return "";
  return locale === "tr" ? entry.tr : entry.en;
}
