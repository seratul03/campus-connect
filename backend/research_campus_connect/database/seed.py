import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app, db
from database.models import Paper, Faculty, Project, Internship, Application, User

def seed_database():
    """Seed the database with mock data"""
    
    with app.app_context():
        # Drop all tables and recreate
        db.drop_all()
        db.create_all()
        
        print("Seeding database...")
        
        # ============================================
        # SEED PAPERS
        # ============================================
        papers = [
            Paper(
                title="Deep Learning Approaches for Natural Language Processing in Sentiment Analysis",
                authors="Bablu Pramanik, Dr. Saumya Das",
                abstract="This paper explores various deep learning architectures for NLP tasks including sentiment analysis, machine translation, and text generation. We present a comprehensive comparison of transformer-based models and their applications in real-world scenarios, with special focus on sentiment classification in social media data.",
                domain="Natural Language Processing",
                year=2024,
                citations=45,
                pdf_url="https://example.com/papers/dl-nlp.pdf",
                published_date="January 15, 2024",
                keywords="Deep Learning, NLP, Transformers, BERT, Sentiment Analysis"
            ),
            Paper(
                title="Low Power VLSI Design Techniques for Energy-Efficient Computing",
                authors="Dr. Biswarup Mukherjee, Dr. Shukla Banik",
                abstract="This research presents novel approaches to low power VLSI design, including dynamic voltage scaling, power gating, and clock gating techniques. We demonstrate significant energy savings in modern computing systems while maintaining performance requirements.",
                domain="VLSI",
                year=2024,
                citations=72,
                pdf_url="https://example.com/papers/low-power-vlsi.pdf",
                published_date="February 20, 2024",
                keywords="VLSI, Low Power Design, Energy Efficiency, Circuit Design"
            ),
            Paper(
                title="Machine Learning for Wireless Communication: Channel Estimation and Optimization",
                authors="Dr. Saumya Das, Dr. Chandrima Thakur",
                abstract="This paper investigates the application of machine learning techniques for channel estimation and resource optimization in wireless communication systems. We propose novel ML-based approaches that significantly improve communication reliability and throughput in challenging environments.",
                domain="Wireless Communication",
                year=2023,
                citations=89,
                pdf_url="https://example.com/papers/ml-wireless.pdf",
                published_date="March 22, 2023",
                keywords="Machine Learning, Wireless Communication, Channel Estimation, 5G"
            ),
            Paper(
                title="IoT-Based Smart Agriculture: Machine Learning Approaches for Crop Monitoring",
                authors="Anirbit Sengupta, Sumana Mahanta, Dr. Shivnath Ghosh",
                abstract="A comprehensive study on IoT-enabled smart agriculture systems integrated with machine learning for real-time crop monitoring, disease detection, and yield prediction. The system demonstrates practical applications in precision farming and resource optimization.",
                domain="IoT & Agriculture",
                year=2024,
                citations=67,
                pdf_url="https://example.com/papers/iot-agriculture.pdf",
                published_date="April 15, 2024",
                keywords="IoT, Agriculture, Machine Learning, Precision Farming, Embedded Systems"
            ),
            Paper(
                title="Advanced Image Processing Techniques for Medical Diagnosis",
                authors="Dr. Saumya Das, Riya Das, Pritam Paul",
                abstract="This research explores advanced image processing and deep learning techniques for automated medical diagnosis. We focus on X-ray and MRI image analysis for early disease detection, achieving high accuracy rates in clinical validation.",
                domain="Medical Image Analysis",
                year=2023,
                citations=134,
                pdf_url="https://example.com/papers/medical-imaging.pdf",
                published_date="June 10, 2023",
                keywords="Medical Imaging, Deep Learning, Computer Vision, Diagnosis"
            ),
            Paper(
                title="Nanoelectronics and AI: Designing Next-Generation Integrated Circuits",
                authors="Dr. Kasturi Ghosh, Dr. Priyanka Saha",
                abstract="This paper presents innovative approaches to IC design and testing using artificial intelligence and machine learning. We explore the integration of AI algorithms in the design flow of nanoscale electronic devices and demonstrate improved performance and reduced time-to-market.",
                domain="VLSI & Nanoelectronics",
                year=2024,
                citations=91,
                pdf_url="https://example.com/papers/nano-ai.pdf",
                published_date="January 30, 2024",
                keywords="Nanoelectronics, AI, VLSI, IC Design, Machine Learning"
            ),
            Paper(
                title="Data Compression Algorithms Using Machine Learning",
                authors="Dr. Arup Roy, Dr. Sandipan Biswas",
                abstract="Exploring novel machine learning-based approaches for data compression that achieve better compression ratios while maintaining data quality. The paper presents comparative analysis with traditional compression methods and demonstrates applications in cloud storage and streaming.",
                domain="Data Science",
                year=2023,
                citations=78,
                pdf_url="https://example.com/papers/ml-compression.pdf",
                published_date="May 12, 2023",
                keywords="Data Compression, Machine Learning, Big Data, Algorithms"
            ),
            Paper(
                title="Wearable Antenna Design for IoT Health Monitoring Systems",
                authors="Dr. Amit Roy, Anirbit Sengupta",
                abstract="A study on designing compact wearable antennas for IoT-enabled health monitoring devices. The research addresses challenges in antenna miniaturization, biocompatibility, and signal quality for continuous health parameter monitoring.",
                domain="Antenna Design & IoT",
                year=2024,
                citations=56,
                pdf_url="https://example.com/papers/wearable-antenna.pdf",
                published_date="March 5, 2024",
                keywords="Wearable Antenna, IoT, Health Monitoring, GNSS"
            ),
            Paper(
                title="Blockchain and IoT Integration for Secure Distributed Systems",
                authors="Rubi Sarkar, Rudranath Mitra",
                abstract="This research investigates the integration of blockchain technology with IoT networks for enhanced security and transparency. We propose a novel architecture for secure data management in distributed IoT ecosystems with applications in supply chain and smart cities.",
                domain="Blockchain & IoT",
                year=2024,
                citations=83,
                pdf_url="https://example.com/papers/blockchain-iot.pdf",
                published_date="February 18, 2024",
                keywords="Blockchain, IoT, Security, Distributed Systems, Smart Contracts"
            ),
            Paper(
                title="Deep Learning for Bioinformatics: Protein Structure Prediction",
                authors="Sudipta Ghosh, Dr. Snigdha Madhab Ghosh",
                abstract="An exploration of deep learning techniques for predicting protein structures and functions. The paper presents novel neural network architectures for analyzing genomic sequences and demonstrates applications in drug discovery and personalized medicine.",
                domain="Bioinformatics",
                year=2023,
                citations=102,
                pdf_url="https://example.com/papers/dl-bioinformatics.pdf",
                published_date="July 22, 2023",
                keywords="Deep Learning, Bioinformatics, Protein Structure, Genomics"
            ),
            Paper(
                title="Soft Computing Techniques for Complex Optimization Problems",
                authors="Dr. Shivnath Ghosh, Sunanda Das",
                abstract="This paper presents soft computing approaches including fuzzy logic, genetic algorithms, and neural networks for solving complex optimization problems. We demonstrate the effectiveness of these techniques in various engineering and business applications.",
                domain="Soft Computing",
                year=2023,
                citations=94,
                pdf_url="https://example.com/papers/soft-computing.pdf",
                published_date="August 14, 2023",
                keywords="Soft Computing, Fuzzy Logic, Genetic Algorithms, Optimization"
            ),
            Paper(
                title="Hyperspectral Image Processing for Environmental Monitoring",
                authors="Rohit Bahadur, Sunanda Das",
                abstract="A comprehensive study on processing hyperspectral remote sensing data for environmental monitoring and land cover classification. The research employs advanced machine learning techniques for analyzing multi-spectral imagery with applications in agriculture and forestry.",
                domain="Image Processing",
                year=2024,
                citations=61,
                pdf_url="https://example.com/papers/hyperspectral.pdf",
                published_date="April 8, 2024",
                keywords="Hyperspectral Imaging, Remote Sensing, Machine Learning, Environmental Monitoring"
            ),
            Paper(
                title="Wireless Sensor Networks: Energy Efficient Protocols and Machine Learning",
                authors="Rudranath Mitra, Kaustav Roy",
                abstract="This paper addresses energy efficiency challenges in wireless sensor networks through novel communication protocols and ML-based resource management. The proposed solutions significantly extend network lifetime while maintaining data quality and reliability.",
                domain="Wireless Sensor Networks",
                year=2023,
                citations=77,
                pdf_url="https://example.com/papers/wsn-energy.pdf",
                published_date="September 15, 2023",
                keywords="WSN, Energy Efficiency, Machine Learning, IoT, Distributed Systems"
            ),
            Paper(
                title="Cognitive Computing: Integrating AI with Human-like Reasoning",
                authors="Sharmistha Dey, Dr. Saumya Das",
                abstract="An exploration of cognitive computing systems that combine artificial intelligence with insights from cognitive science to create more human-like intelligent systems. The research demonstrates applications in natural language understanding and decision support systems.",
                domain="Artificial Intelligence",
                year=2024,
                citations=88,
                pdf_url="https://example.com/papers/cognitive-computing.pdf",
                published_date="March 28, 2024",
                keywords="Cognitive Computing, AI, Machine Learning, Cognitive Science"
            ),
            Paper(
                title="Cloud Computing and AI: Scalable Machine Learning Services",
                authors="Gulfishan Mobin, Dr. Sandipan Biswas",
                abstract="This research investigates the deployment of AI and machine learning services on cloud platforms, addressing challenges in scalability, resource management, and cost optimization. We propose novel architectures for cloud-based ML applications.",
                domain="Cloud Computing",
                year=2024,
                citations=70,
                pdf_url="https://example.com/papers/cloud-ai.pdf",
                published_date="January 12, 2024",
                keywords="Cloud Computing, AI, Machine Learning, Scalability, DevOps"
            ),
            Paper(
                title="Biometric Authentication with Advanced Sensor Technology",
                authors="Suvabrata Guharay",
                abstract="A study on developing secure biometric authentication systems using advanced sensor technologies. The research covers fingerprint recognition, iris scanning, and multi-modal biometric fusion with applications in access control and security systems.",
                domain="Biometrics",
                year=2023,
                citations=59,
                pdf_url="https://example.com/papers/biometric-sensors.pdf",
                published_date="October 5, 2023",
                keywords="Biometrics, Sensors, Security, Authentication, Pattern Recognition"
            ),
            Paper(
                title="Context-Aware Spelling Correction for Noisy Text Data",
                authors="Ditu Barai, Bablu Pramanik",
                abstract="This paper presents novel algorithms for context-aware spelling correction in noisy text from social media and informal communications. The approach leverages deep learning and contextual embeddings to achieve superior correction accuracy.",
                domain="Natural Language Processing",
                year=2024,
                citations=42,
                pdf_url="https://example.com/papers/spelling-correction.pdf",
                published_date="February 25, 2024",
                keywords="NLP, Spelling Correction, Text Processing, Deep Learning"
            ),
            Paper(
                title="Medical Data Analysis Using Deep Learning: Disease Prediction and Diagnosis",
                authors="Subhajeet Das, Pritam Paul, Mohit Kumar Halder",
                abstract="An investigation of deep learning techniques for analyzing medical data and predicting diseases. The research demonstrates high accuracy in disease classification using clinical records and demonstrates the potential of AI in healthcare.",
                domain="Medical Data Analysis",
                year=2024,
                citations=95,
                pdf_url="https://example.com/papers/medical-dl.pdf",
                published_date="March 15, 2024",
                keywords="Deep Learning, Medical Analysis, Disease Prediction, Healthcare AI"
            ),
            Paper(
                title="Grid Computing and Distributed Resource Management",
                authors="Kaustav Roy, Dr. Shivnath Ghosh",
                abstract="This paper presents novel approaches to resource management and load balancing in grid computing environments. We propose intelligent scheduling algorithms that optimize resource utilization across distributed computing nodes while maintaining quality of service guarantees.",
                domain="Grid Computing",
                year=2024,
                citations=54,
                pdf_url="https://example.com/papers/grid-computing.pdf",
                published_date="May 20, 2024",
                keywords="Grid Computing, Resource Management, Distributed Systems, Load Balancing"
            ),
            Paper(
                title="Advanced Machine Learning Techniques for Pattern Recognition",
                authors="Anindita Chakraborty, Aishee Chakraborty, Somashri Pal Kar",
                abstract="A comprehensive study on applying advanced machine learning techniques including ensemble methods, transfer learning, and meta-learning for complex pattern recognition tasks. The research demonstrates superior performance on benchmark datasets.",
                domain="Machine Learning",
                year=2024,
                citations=68,
                pdf_url="https://example.com/papers/ml-pattern-recognition.pdf",
                published_date="April 18, 2024",
                keywords="Machine Learning, Pattern Recognition, Ensemble Methods, Transfer Learning"
            ),
            Paper(
                title="Computer Vision and Deep Neural Networks for Automated Quality Control",
                authors="Riya Das, Subhajeet Das, Dr. Saumya Das",
                abstract="This research explores the application of computer vision and deep neural networks for automated quality control in manufacturing. We develop a real-time defect detection system using convolutional neural networks with high accuracy and low false positive rates.",
                domain="Computer Vision",
                year=2023,
                citations=81,
                pdf_url="https://example.com/papers/cv-quality-control.pdf",
                published_date="November 12, 2023",
                keywords="Computer Vision, Deep Learning, Quality Control, Defect Detection"
            ),
            Paper(
                title="Network Traffic Analysis Using Machine Learning for Intrusion Detection",
                authors="Amitava Podder, Dr. Shivnath Ghosh",
                abstract="An investigation of machine learning approaches for network traffic analysis and intrusion detection. The paper presents a hybrid system combining supervised and unsupervised learning for identifying anomalous network behavior with minimal false alarms.",
                domain="Network Security",
                year=2024,
                citations=76,
                pdf_url="https://example.com/papers/network-intrusion.pdf",
                published_date="February 8, 2024",
                keywords="Network Security, Machine Learning, Intrusion Detection, Traffic Analysis"
            ),
            Paper(
                title="Explainable AI for Healthcare Decision Support Systems",
                authors="Dr. Saumya Das, Pritam Paul, Sharmistha Dey",
                abstract="This paper addresses the critical need for explainability in AI-based healthcare systems. We propose novel techniques for making deep learning models interpretable for medical professionals, enabling better trust and adoption of AI-assisted diagnosis systems.",
                domain="Healthcare AI",
                year=2024,
                citations=103,
                pdf_url="https://example.com/papers/explainable-ai-healthcare.pdf",
                published_date="March 25, 2024",
                keywords="Explainable AI, Healthcare, Deep Learning, Interpretability"
            ),
            Paper(
                title="Federated Learning for Privacy-Preserving Medical Research",
                authors="Sarbani Karak, Mohit Kumar Halder, Dr. Sandipan Biswas",
                abstract="A study on implementing federated learning frameworks for collaborative medical research while preserving patient privacy. The research demonstrates how multiple hospitals can jointly train machine learning models without sharing sensitive patient data.",
                domain="Federated Learning",
                year=2024,
                citations=87,
                pdf_url="https://example.com/papers/federated-learning.pdf",
                published_date="April 30, 2024",
                keywords="Federated Learning, Privacy, Healthcare, Distributed Learning"
            ),
            Paper(
                title="Smart City Infrastructure Using IoT and Edge Computing",
                authors="Anirbit Sengupta, Dr. Chandrima Thakur, Rubi Sarkar",
                abstract="This research presents a comprehensive architecture for smart city infrastructure leveraging IoT sensors and edge computing. We demonstrate real-time data processing for traffic management, environmental monitoring, and public safety applications.",
                domain="Smart Cities",
                year=2024,
                citations=92,
                pdf_url="https://example.com/papers/smart-city-iot.pdf",
                published_date="January 28, 2024",
                keywords="Smart Cities, IoT, Edge Computing, Urban Planning"
            ),
            Paper(
                title="Reinforcement Learning for Autonomous Robotic Systems",
                authors="Dr. Snigdha Madhab Ghosh, Aishee Chakraborty",
                abstract="An exploration of reinforcement learning techniques for training autonomous robotic systems. The paper presents novel reward shaping strategies and efficient exploration methods that enable robots to learn complex tasks with minimal human intervention.",
                domain="Robotics & AI",
                year=2023,
                citations=110,
                pdf_url="https://example.com/papers/rl-robotics.pdf",
                published_date="September 20, 2023",
                keywords="Reinforcement Learning, Robotics, Autonomous Systems, Deep RL"
            ),
            Paper(
                title="Natural Language Understanding for Regional Languages",
                authors="Bablu Pramanik, Ditu Barai, Sudipta Ghosh",
                abstract="This paper addresses challenges in developing NLP systems for low-resource regional languages. We present novel transfer learning approaches and data augmentation techniques that enable effective language models with limited training data.",
                domain="Natural Language Processing",
                year=2024,
                citations=63,
                pdf_url="https://example.com/papers/nlp-regional.pdf",
                published_date="May 15, 2024",
                keywords="NLP, Regional Languages, Transfer Learning, Low-Resource Languages"
            ),
            Paper(
                title="Energy-Aware Cloud Computing: Green Data Centers",
                authors="Gulfishan Mobin, Dr. Arup Roy, Kaustav Roy",
                abstract="A comprehensive study on energy-efficient cloud computing and green data center design. The research proposes novel workload scheduling algorithms and cooling optimization strategies that significantly reduce energy consumption while maintaining performance.",
                domain="Cloud Computing",
                year=2023,
                citations=74,
                pdf_url="https://example.com/papers/green-cloud.pdf",
                published_date="October 18, 2023",
                keywords="Cloud Computing, Energy Efficiency, Green Computing, Data Centers"
            ),
            Paper(
                title="Adversarial Machine Learning: Attacks and Defense Mechanisms",
                authors="Dr. Snigdha Madhab Ghosh, Sarbani Karak, Mohit Kumar Halder",
                abstract="This research investigates adversarial attacks on machine learning models and proposes robust defense mechanisms. We demonstrate various attack vectors and develop adversarial training techniques that improve model robustness without sacrificing accuracy.",
                domain="Machine Learning Security",
                year=2024,
                citations=99,
                pdf_url="https://example.com/papers/adversarial-ml.pdf",
                published_date="February 12, 2024",
                keywords="Adversarial ML, Security, Robustness, Defense Mechanisms"
            ),
            Paper(
                title="Time Series Forecasting with Hybrid Deep Learning Models",
                authors="Dr. Sandipan Biswas, Anindita Chakraborty, Sumana Mahanta",
                abstract="An investigation of hybrid deep learning architectures combining LSTMs, CNNs, and attention mechanisms for accurate time series forecasting. Applications include stock market prediction, weather forecasting, and demand prediction in various industries.",
                domain="Data Science",
                year=2024,
                citations=85,
                pdf_url="https://example.com/papers/time-series-dl.pdf",
                published_date="March 10, 2024",
                keywords="Time Series, Deep Learning, LSTM, Forecasting, Attention Mechanism"
            ),
            Paper(
                title="5G Network Optimization Using Machine Learning",
                authors="Dr. Chandrima Thakur, Dr. Saumya Das, Dr. Amit Roy",
                abstract="This paper explores machine learning techniques for optimizing 5G network performance. We develop intelligent algorithms for resource allocation, handover management, and interference mitigation that significantly improve network efficiency and user experience.",
                domain="5G Networks",
                year=2024,
                citations=108,
                pdf_url="https://example.com/papers/5g-ml.pdf",
                published_date="April 5, 2024",
                keywords="5G, Machine Learning, Network Optimization, Wireless Communication"
            ),
            Paper(
                title="Multi-Modal Biometric Fusion for Enhanced Security",
                authors="Suvabrata Guharay, Amitava Podder",
                abstract="A study on fusing multiple biometric modalities including fingerprint, face, iris, and voice for enhanced authentication security. The research demonstrates that multi-modal systems achieve significantly higher accuracy and are more resistant to spoofing attacks.",
                domain="Biometric Security",
                year=2023,
                citations=71,
                pdf_url="https://example.com/papers/multimodal-biometric.pdf",
                published_date="December 5, 2023",
                keywords="Biometrics, Multi-Modal Fusion, Security, Authentication"
            ),
            Paper(
                title="Quantum Machine Learning: Algorithms and Applications",
                authors="Dr. Kasturi Ghosh, Dr. Priyanka Saha, Dr. Shivnath Ghosh",
                abstract="An exploration of quantum computing principles applied to machine learning algorithms. This paper presents quantum-enhanced algorithms for classification, clustering, and optimization problems, demonstrating potential quantum advantages for specific applications.",
                domain="Quantum Computing",
                year=2024,
                citations=115,
                pdf_url="https://example.com/papers/quantum-ml.pdf",
                published_date="January 20, 2024",
                keywords="Quantum Computing, Machine Learning, Quantum Algorithms, QML"
            ),
            Paper(
                title="Agricultural Pest Detection Using Computer Vision and IoT",
                authors="Sumana Mahanta, Anirbit Sengupta, Sunanda Das",
                abstract="This research presents an integrated system for early detection of agricultural pests using computer vision and IoT sensors. The system employs deep learning models for pest identification and provides real-time alerts to farmers, enabling timely intervention.",
                domain="Agriculture & AI",
                year=2024,
                citations=58,
                pdf_url="https://example.com/papers/pest-detection.pdf",
                published_date="May 8, 2024",
                keywords="Agriculture, Computer Vision, IoT, Pest Detection, Deep Learning"
            )
        ]
        
        db.session.add_all(papers)
        
        # ============================================
        # SEED FACULTY (From faculty.json)
        # ============================================
        faculty_members = [
            Faculty(
                name="Dr. Shivnath Ghosh",
                designation="Professor & HOD",
                department="Department of Computer Science & Engineering (AI)",
                email="shivnath.ghosh@university.edu",
                phone="+91-9830123456",
                research_areas="Soft Computing, IoT, AI",
                bio="Dr. Shivnath Ghosh is a distinguished Professor and Head of the Department with over 20 years of experience in Computer Science and Artificial Intelligence. His pioneering research in soft computing techniques has been widely recognized in international conferences. He leads multiple research groups focusing on IoT applications and AI-driven solutions for real-world problems.",
                image_url="/Faculty/Photos/Dr. Shivnath Ghosh.jpg"
            ),
            Faculty(
                name="Dr. Kasturi Ghosh",
                designation="Associate Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="kasturi.ghosh@university.edu",
                phone="+91-9830234567",
                research_areas="VLSI, Nanoelectronics, Design and testing of ICs using Artificial Intelligence and Machine Learning",
                bio="Dr. Kasturi Ghosh is an accomplished researcher specializing in VLSI design and nanoelectronics. Her innovative work integrates artificial intelligence and machine learning techniques for IC design and testing. She has published over 40 research papers in top-tier journals and has been a keynote speaker at numerous international conferences. Her research focuses on developing intelligent systems for next-generation semiconductor devices.",
                image_url="/Faculty/Photos/Dr. Kasturi Ghosh.jpg"
            ),
            Faculty(
                name="Dr. Biswarup Mukherjee",
                designation="Associate Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="biswarup.mukherjee@university.edu",
                phone="+91-9830345678",
                research_areas="Low power VLSI",
                bio="Dr. Biswarup Mukherjee is a leading expert in low power VLSI design with extensive experience in developing energy-efficient circuit architectures. His research has contributed significantly to the advancement of power-aware computing systems. He has successfully guided numerous research scholars and has secured multiple research grants for his innovative projects in sustainable electronics.",
                image_url="/Faculty/Photos/Dr. Biswarup Mukherjee.jpg"
            ),
            Faculty(
                name="Dr. Saumya Das",
                designation="Associate Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="saumya.das@university.edu",
                phone="+91-9830456789",
                research_areas="Artificial Intelligence, Machine Learning for Wireless Communication, Medical Image Analysis, Natural Language Processing",
                bio="Dr. Saumya Das is a versatile researcher with expertise spanning multiple domains of artificial intelligence. Her work in applying machine learning to wireless communication systems has resulted in several patents. She is particularly passionate about medical image analysis and has collaborated with healthcare institutions to develop AI-powered diagnostic tools. Her research in NLP has also contributed to developing intelligent conversational systems.",
                image_url="/Faculty/Photos/Dr Saumya Das.jpg"
            ),
            Faculty(
                name="Dr. Arup Roy",
                designation="Associate Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="arup.roy@university.edu",
                phone="+91-9830567890",
                research_areas="Machine Learning, Data Compression",
                bio="Dr. Arup Roy specializes in machine learning algorithms and data compression techniques. His research focuses on developing efficient algorithms for big data processing and storage optimization. He has published extensively in prestigious journals and serves as a reviewer for several international conferences. His work has practical applications in cloud computing and multimedia systems.",
                image_url="/Faculty/Photos/Dr. Arup Roy.jpg"
            ),
            Faculty(
                name="Dr. Amit Roy",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="amit.roy@university.edu",
                phone="+91-9830678901",
                research_areas="Wearable Antenna, GNSS, Satellite Communication",
                bio="Dr. Amit Roy is an expert in antenna design and satellite communication systems. His research on wearable antennas has opened new possibilities for IoT and health monitoring devices. He has extensive experience working with GNSS technologies and has contributed to improving positioning accuracy in challenging environments. His interdisciplinary approach combines electromagnetic theory with practical engineering solutions.",
                image_url="/Faculty/Photos/Dr. Amit Roy.jpg"
            ),
            Faculty(
                name="Amitava Podder",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="amitava.podder@university.edu",
                phone="+91-9830789012",
                research_areas="Computer Networking, Image Processing",
                bio="Amitava Podder is a dedicated researcher pursuing his Ph.D. while contributing significantly to the field of computer networking and image processing. His work focuses on developing efficient network protocols and advanced image enhancement techniques. He has a strong background in both theoretical and practical aspects of networking, and his research has applications in distributed systems and visual computing.",
                image_url="/Faculty/Photos/Amitava Podder.jpg"
            ),
            Faculty(
                name="Anindita Chakraborty",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="anindita.chakraborty@university.edu",
                phone="+91-9830890123",
                research_areas="Machine Learning",
                bio="Anindita Chakraborty is an emerging researcher in machine learning with a focus on developing innovative algorithms for classification and prediction tasks. Her teaching methodology combines theoretical foundations with hands-on practical sessions. She actively engages students in research projects and has mentored several award-winning undergraduate projects in ML applications.",
                image_url="/Faculty/Photos/Anindita Chakraborty.jpeg"
            ),
            Faculty(
                name="Bablu Pramanik",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="bablu.pramanik@university.edu",
                phone="+91-9830901234",
                research_areas="Natural Language Processing, Sentiment Analysis",
                bio="Bablu Pramanik is a passionate researcher in Natural Language Processing with a special interest in sentiment analysis and opinion mining. Currently pursuing his Ph.D., he has developed several NLP tools for analyzing social media data and customer feedback. His work has practical applications in business intelligence and social media analytics. He regularly collaborates with industry partners to solve real-world NLP challenges.",
                image_url="/Faculty/Photos/Bablu Pramanik.jpeg"
            ),
            Faculty(
                name="Dr. Sandipan Biswas",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sandipan.biswas@university.edu",
                phone="+91-9831012345",
                research_areas="Data Science, Machine Learning",
                bio="Dr. Sandipan Biswas is an accomplished data scientist with extensive experience in applying machine learning techniques to solve complex business problems. His research covers various aspects of data analytics, predictive modeling, and statistical machine learning. He has published several papers on data-driven decision making and has worked with multiple organizations on data science projects.",
                image_url="/Faculty/Photos/Dr. Sandipan Biswas.jpg"
            ),
            Faculty(
                name="Dr. Shukla Banik",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="shukla.banik@university.edu",
                phone="+91-9831123456",
                research_areas="VLSI Design and Testing",
                bio="Dr. Shukla Banik is a specialist in VLSI design and testing methodologies. Her research focuses on developing fault-tolerant circuit designs and efficient testing strategies for integrated circuits. She has contributed to several industry projects involving chip design and validation. Her expertise in hardware-software co-design makes her research highly relevant to modern computing systems.",
                image_url="/Faculty/Photos/Dr. Shukla Banik.jpeg"
            ),
            Faculty(
                name="Dr. Snigdha Madhab Ghosh",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="snigdha.ghosh@university.edu",
                phone="+91-9831234567",
                research_areas="Machine Learning, Deep Learning",
                bio="Dr. Snigdha Madhab Ghosh is a dynamic researcher specializing in machine learning and deep learning architectures. His work focuses on developing novel neural network models for computer vision and pattern recognition tasks. He has published in prestigious conferences and maintains active collaborations with international research groups. His teaching style emphasizes hands-on learning with state-of-the-art deep learning frameworks.",
                image_url="/Faculty/Photos/Dr. Snigdha Madhab Ghosh.jpg"
            ),
            Faculty(
                name="Kaustav Roy",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="kaustav.roy@university.edu",
                phone="+91-9831345678",
                research_areas="Grid Computing",
                bio="Kaustav Roy is a researcher specializing in grid computing and distributed systems. Currently enrolled in a Ph.D. program, his work focuses on resource management and task scheduling in large-scale computing grids. He has experience working with cloud platforms and has developed several tools for optimizing computational workflows. His research bridges the gap between theoretical distributed computing and practical implementation.",
                image_url="/Faculty/Photos/Kaustav Roy.jpg"
            ),
            Faculty(
                name="Dr. Priyanka Saha",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="priyanka.saha@university.edu",
                phone="+91-9831456789",
                research_areas="Electronics and Communication - Nano Electronics",
                bio="Dr. Priyanka Saha is an expert in nanoelectronics and its applications in modern communication systems. Her research explores the quantum effects in nanoscale devices and their implications for future computing technologies. She has published extensively in the field of nano-devices and has received several awards for her contributions to electronics engineering. Her interdisciplinary approach combines physics, electronics, and materials science.",
                image_url="/Faculty/Photos/Dr Priyanka Saha.jpg"
            ),
            Faculty(
                name="Rudranath Mitra",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="rudranath.mitra@university.edu",
                phone="+91-9831567890",
                research_areas="Wireless Sensor Networks, Machine Learning, Distributed Databases",
                bio="Rudranath Mitra is a multifaceted researcher with expertise in wireless sensor networks, machine learning, and distributed databases. His research addresses challenges in IoT deployments and sensor data management. He has developed energy-efficient protocols for WSN and ML-based solutions for network optimization. Currently registered for his Ph.D., he actively publishes in reputed journals and conferences.",
                image_url="/Faculty/Photos/Rudranath Mitra.jpg"
            ),
            Faculty(
                name="Suvabrata Guharay",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="suvabrata.guharay@university.edu",
                phone="+91-9831678901",
                research_areas="Bio-Metric with Sensor Technology",
                bio="Suvabrata Guharay specializes in biometric authentication systems integrated with advanced sensor technologies. His research focuses on developing secure and user-friendly biometric solutions for various applications. He has worked on projects involving fingerprint recognition, iris scanning, and multi-modal biometric systems. Currently pursuing his Ph.D., his work has applications in security systems and access control.",
                image_url="/Faculty/Photos/Suvabrata Guharay.jpg"
            ),
            Faculty(
                name="Ditu Barai",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="ditu.barai@university.edu",
                phone="+91-9831789012",
                research_areas="Natural Language Processing, Spelling Correction",
                bio="Ditu Barai is a dedicated researcher in Natural Language Processing with a focus on spelling correction and text normalization. Her work addresses challenges in processing noisy text data from social media and informal communications. She has developed several algorithms for context-aware spelling correction and has contributed to improving text processing systems for regional languages. Her research has practical applications in search engines and text editors.",
                image_url="/Faculty/Photos/Ditu Barai.jpg"
            ),
            Faculty(
                name="Anirbit Sengupta",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="anirbit.sengupta@university.edu",
                phone="+91-9831890123",
                research_areas="IoT, Machine Learning, Embedded System, Agriculture",
                bio="Anirbit Sengupta is an innovative researcher working at the intersection of IoT, machine learning, and agricultural technology. His research focuses on developing smart farming solutions using embedded systems and ML algorithms. He has implemented several projects for precision agriculture and crop monitoring. Currently registered for his Ph.D., his work demonstrates the practical impact of technology in improving agricultural productivity.",
                image_url="/Faculty/Photos/Anirbit Sengupta.jpg"
            ),
            Faculty(
                name="Somashri Pal Kar",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="somashri.kar@university.edu",
                phone="+91-9831901234",
                research_areas="Artificial Intelligence, Machine Learning",
                bio="Somashri Pal Kar is an enthusiastic educator and researcher in artificial intelligence and machine learning. Her research interests include developing intelligent systems for decision support and automation. She is passionate about making AI accessible to students and regularly conducts workshops on ML applications. Her teaching approach emphasizes problem-solving skills and practical implementation of AI concepts.",
                image_url="/Faculty/Photos/Somashri Pal Kar.jpg"
            ),
            Faculty(
                name="Riya Das",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="riya.das@university.edu",
                phone="+91-9832012345",
                research_areas="Machine Learning, Deep Learning, Image Processing",
                bio="Riya Das is a promising researcher in machine learning, deep learning, and image processing. Her work focuses on developing advanced image analysis techniques using convolutional neural networks. She has contributed to projects in medical image analysis and computer vision applications. Her research combines theoretical understanding with practical implementation, making significant contributions to visual computing.",
                image_url="/Faculty/Photos/Riya Das.jpg"
            ),
            Faculty(
                name="Sunanda Das",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sunanda.das@university.edu",
                phone="+91-9832123456",
                research_areas="Machine Learning, Image Processing, Soft Computing",
                bio="Sunanda Das is an experienced researcher with her Ph.D. thesis submitted, specializing in machine learning, image processing, and soft computing techniques. Her research explores fuzzy logic and evolutionary algorithms for solving complex optimization problems. She has qualified SET and has published numerous papers in reputed journals. Her work has applications in pattern recognition and intelligent decision-making systems.",
                image_url="/Faculty/Photos/Sunanda Das.jpg"
            ),
            Faculty(
                name="Sumana Mahanta",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sumana.mahanta@university.edu",
                phone="+91-9832234567",
                research_areas="Enhancing Agricultural Productivity with Machine Learning",
                bio="Sumana Mahanta is a dedicated researcher focusing on applying machine learning techniques to enhance agricultural productivity. Currently enrolled in a Ph.D. program, her work addresses critical challenges in crop yield prediction, disease detection, and resource optimization. She collaborates with agricultural experts to develop practical solutions for farmers. Her research demonstrates the transformative potential of AI in agriculture.",
                image_url="/Faculty/Photos/Sumana Mahanta.jpg"
            ),
            Faculty(
                name="Sudipta Ghosh",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sudipta.ghosh@university.edu",
                phone="+91-9832345678",
                research_areas="Bioinformatics in ML, Deep Learning, Natural Language Processing",
                bio="Sudipta Ghosh is a versatile researcher with expertise in bioinformatics, deep learning, and natural language processing. His work bridges the gap between computational biology and artificial intelligence. He has developed ML models for analyzing genomic data and protein structure prediction. His interdisciplinary research has applications in drug discovery and personalized medicine.",
                image_url="/Faculty/Photos/Sudipta Ghosh.jpg"
            ),
            Faculty(
                name="Mohit Kumar Halder",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="mohit.halder@university.edu",
                phone="+91-9832456789",
                research_areas="Deep Learning, Machine Learning",
                bio="Mohit Kumar Halder is an active researcher pursuing his Ph.D. in deep learning and machine learning. His research focuses on developing efficient neural network architectures for resource-constrained environments. He has contributed to projects in edge computing and mobile AI applications. His work emphasizes practical implementation of DL algorithms with attention to computational efficiency.",
                image_url="/Faculty/Photos/Mohit Kumar Halder.jpg"
            ),
            Faculty(
                name="Rubi Sarkar",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="rubi.sarkar@university.edu",
                phone="+91-9832567890",
                research_areas="Blockchain, Machine Learning, Deep Learning, IoT",
                bio="Rubi Sarkar is a forward-thinking researcher enrolled in a Ph.D. program, specializing in blockchain technology, machine learning, deep learning, and IoT. Her research explores the integration of blockchain with AI for secure and transparent systems. She has worked on projects involving smart contracts and decentralized applications. Her multidisciplinary approach addresses emerging challenges in distributed intelligent systems.",
                image_url="/Faculty/Photos/Rubi Sarkar.jpg"
            ),
            Faculty(
                name="Rohit Bahadur",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="rohit.bahadur@university.edu",
                phone="+91-9832678901",
                research_areas="Machine Learning, Deep Learning, Hyperspectral Image Processing",
                bio="Rohit Bahadur is a specialist in machine learning and deep learning with a focus on hyperspectral image processing. His research addresses challenges in analyzing multi-spectral and hyperspectral remote sensing data. He has developed algorithms for land cover classification and environmental monitoring. His work has applications in agriculture, forestry, and urban planning.",
                image_url="/Faculty/Photos/Rohit Bahadur.jpg"
            ),
            Faculty(
                name="Pritam Paul",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="pritam.paul@university.edu",
                phone="+91-9832789012",
                research_areas="Deep Learning, Medical Data Analysis",
                bio="Pritam Paul is a researcher specializing in deep learning applications for medical data analysis. His work focuses on developing AI models for disease diagnosis and prognosis using clinical data. He has qualified NET and actively collaborates with healthcare institutions. His research aims to improve patient outcomes through intelligent medical decision support systems.",
                image_url="/Faculty/Photos/Pritam Paul.jpg"
            ),
            Faculty(
                name="Subhajeet Das",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="subhajeet.das@university.edu",
                phone="+91-9832890123",
                research_areas="Machine Learning, Deep Learning, Medical Image Analysis",
                bio="Subhajeet Das is a qualified NET professional specializing in machine learning, deep learning, and medical image analysis. His research focuses on developing computer-aided diagnosis systems using advanced image processing techniques. He has worked on projects involving X-ray, CT, and MRI image analysis. His contributions are helping advance automated medical diagnostics.",
                image_url="/Faculty/Photos/Subhajeet Das.jpg"
            ),
            Faculty(
                name="Sarbani Karak",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sarbani.karak@university.edu",
                phone="+91-9832901234",
                research_areas="Machine Learning, Deep Learning",
                bio="Sarbani Karak is an educator and researcher with dual qualifications in M.Sc. and M.Tech, specializing in machine learning and deep learning. Her research interests include developing efficient learning algorithms and neural network optimization. She is passionate about teaching and has mentored numerous students in ML projects. Her approach combines rigorous theoretical foundations with practical applications.",
                image_url="/Faculty/Photos/Sarbani Karak.jpg"
            ),
            Faculty(
                name="Gulfishan Mobin",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="gulfishan.mobin@university.edu",
                phone="+91-9833012345",
                research_areas="Cloud Computing, Artificial Intelligence",
                bio="Gulfishan Mobin is a researcher pursuing her Ph.D. while specializing in cloud computing and artificial intelligence. Her work focuses on developing intelligent cloud services and resource management strategies. She has experience with major cloud platforms and has contributed to projects involving cloud-based AI applications. Her research addresses scalability and efficiency challenges in cloud computing.",
                image_url="/Faculty/Photos/Gulfishan Mobin.jpg"
            ),
            Faculty(
                name="Aishee Chakraborty",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="aishee.chakraborty@university.edu",
                phone="+91-9833123456",
                research_areas="Deep Learning, Machine Learning",
                bio="Aishee Chakraborty is an emerging researcher in deep learning and machine learning with a focus on developing innovative neural network architectures. Her research explores attention mechanisms and transfer learning techniques. She actively participates in ML competitions and has achieved notable results. Her teaching methodology emphasizes hands-on learning and project-based education.",
                image_url="/Faculty/Photos/Aishee Chakraborty.jpg"
            ),
            Faculty(
                name="Dr. Chandrima Thakur",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="chandrima.thakur@university.edu",
                phone="+91-9833234567",
                research_areas="Machine Learning and Deep Learning for Wireless Communication, IRS, IoT",
                bio="Dr. Chandrima Thakur is an accomplished researcher specializing in applying machine learning and deep learning to wireless communication systems. Her work on Intelligent Reflecting Surfaces (IRS) and IoT networks has been published in top conferences. She focuses on developing intelligent algorithms for next-generation communication systems. Her research addresses key challenges in 5G and beyond wireless networks.",
                image_url="/Faculty/Photos/Dr. Chandrima Thakur.jpg"
            ),
            Faculty(
                name="Sharmistha Dey",
                designation="Assistant Professor",
                department="Department of Computer Science & Engineering (AI)",
                email="sharmistha.dey@university.edu",
                phone="+91-9833345678",
                research_areas="Artificial Intelligence, Machine Learning, Deep Learning, Cognitive Science",
                bio="Sharmistha Dey is a multidisciplinary researcher registered for her Ph.D., with expertise spanning artificial intelligence, machine learning, deep learning, and cognitive science. Her unique research combines insights from neuroscience with AI to develop more human-like intelligent systems. She explores how cognitive principles can enhance machine learning models. Her interdisciplinary approach opens new avenues for developing truly intelligent artificial systems.",
                image_url="/Faculty/Photos/Sharmistha Dey.jpg"
            )
        ]
        
        db.session.add_all(faculty_members)
        
        # ============================================
        # SEED PROJECTS
        # ============================================
        projects = [
            Project(
                title="AI-Powered Medical Image Analysis System",
                description="Develop a deep learning system to assist medical professionals in diagnosing diseases from medical images. The project involves training convolutional neural networks on X-ray, CT, and MRI datasets for automated disease detection and classification.",
                faculty_name="Dr. Saumya Das",
                domain="Medical Image Analysis",
                duration="6 months",
                requirements="Strong programming skills in Python, knowledge of TensorFlow/PyTorch, understanding of image processing, interest in healthcare applications",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="IoT-Based Smart Agriculture Monitoring System",
                description="Design and implement an IoT system for real-time agricultural monitoring using various sensors. Develop machine learning models for crop disease prediction and yield optimization. Work with embedded systems and cloud platforms.",
                faculty_name="Anirbit Sengupta",
                domain="IoT & Agriculture",
                duration="7 months",
                requirements="Knowledge of IoT protocols, embedded systems programming, machine learning basics, interest in agricultural technology",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Blockchain-Based Secure Data Management System",
                description="Develop a blockchain solution for secure and transparent data management in distributed systems. Focus on smart contracts, consensus mechanisms, and decentralized application development. Explore applications in supply chain or healthcare.",
                faculty_name="Rubi Sarkar",
                domain="Blockchain",
                duration="6 months",
                requirements="Knowledge of blockchain technology, Solidity, web development skills (JavaScript), understanding of cryptography",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Natural Language Processing for Sentiment Analysis",
                description="Build an advanced NLP system for sentiment analysis of social media data. Implement transformer-based models (BERT, GPT) for analyzing customer feedback and social media posts. Develop a web-based dashboard for visualization.",
                faculty_name="Bablu Pramanik",
                domain="Natural Language Processing",
                duration="5 months",
                requirements="Proficiency in Python, knowledge of NLP libraries (NLTK, spaCy), experience with deep learning frameworks, interest in text analytics",
                status="ongoing",
                start_date="December 2024"
            ),
            Project(
                title="Low Power VLSI Circuit Design and Optimization",
                description="Research and implement low power design techniques for VLSI circuits. Work on power-aware circuit design, simulation, and verification. Explore dynamic voltage scaling and clock gating techniques for energy-efficient computing.",
                faculty_name="Dr. Biswarup Mukherjee",
                domain="VLSI",
                duration="8 months",
                requirements="Understanding of digital circuit design, knowledge of HDL (Verilog/VHDL), experience with EDA tools, strong analytical skills",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Wireless Sensor Network for Environmental Monitoring",
                description="Develop an energy-efficient wireless sensor network for monitoring environmental parameters. Implement novel routing protocols and machine learning algorithms for data aggregation and anomaly detection in sensor data.",
                faculty_name="Rudranath Mitra",
                domain="Wireless Sensor Networks",
                duration="6 months",
                requirements="Understanding of network protocols, programming skills in C/Python, knowledge of embedded systems, interest in IoT",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Deep Learning for Hyperspectral Image Classification",
                description="Implement deep learning models for analyzing hyperspectral remote sensing images. Focus on land cover classification, crop monitoring, and environmental assessment. Work with satellite imagery and develop visualization tools.",
                faculty_name="Rohit Bahadur",
                domain="Image Processing",
                duration="6 months",
                requirements="Python programming, knowledge of deep learning, basic understanding of remote sensing, experience with image processing",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Cloud-Based Machine Learning Platform Development",
                description="Build a scalable cloud-based platform for deploying and managing machine learning models. Implement MLOps practices, containerization, and API development. Work with AWS/Azure/GCP for cloud deployment.",
                faculty_name="Gulfishan Mobin",
                domain="Cloud Computing",
                duration="7 months",
                requirements="Cloud platform experience (AWS/Azure/GCP), Docker/Kubernetes, Python programming, REST API development, ML model deployment",
                status="ongoing",
                start_date="November 2024"
            ),
            Project(
                title="Biometric Authentication System Using Multi-Modal Fusion",
                description="Develop a secure biometric authentication system integrating multiple biometric modalities (fingerprint, iris, face). Implement sensor integration, feature extraction, and fusion algorithms for enhanced security and accuracy.",
                faculty_name="Suvabrata Guharay",
                domain="Biometrics",
                duration="6 months",
                requirements="Image processing knowledge, machine learning basics, programming in Python/C++, interest in security systems",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Cognitive AI System for Human-like Reasoning",
                description="Research and develop cognitive computing systems that integrate AI with cognitive science principles. Focus on natural language understanding, context-aware decision making, and human-computer interaction. Explore applications in intelligent assistants.",
                faculty_name="Sharmistha Dey",
                domain="Artificial Intelligence",
                duration="8 months",
                requirements="Strong AI/ML background, knowledge of cognitive science, Python programming, interest in interdisciplinary research",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="VLSI Testing Using AI and Machine Learning",
                description="Develop AI-based approaches for VLSI circuit testing and fault detection. Implement machine learning models for test pattern generation and fault diagnosis. Work with circuit simulators and develop automated testing frameworks.",
                faculty_name="Dr. Kasturi Ghosh",
                domain="VLSI & AI",
                duration="7 months",
                requirements="Knowledge of VLSI design and testing, machine learning basics, programming skills, understanding of digital circuits",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Wearable Antenna Design for Health Monitoring Devices",
                description="Design and simulate compact wearable antennas for IoT health monitoring applications. Focus on antenna miniaturization, biocompatibility, and integration with wearable devices. Perform electromagnetic simulations and prototype testing.",
                faculty_name="Dr. Amit Roy",
                domain="Antenna Design",
                duration="6 months",
                requirements="Understanding of antenna theory, knowledge of EM simulation tools (HFSS/CST), basic RF concepts, interest in wearable technology",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Quantum Machine Learning for Optimization Problems",
                description="Explore quantum computing algorithms applied to machine learning and optimization problems. Work with quantum simulators and real quantum hardware to develop and test quantum-enhanced ML algorithms for combinatorial optimization.",
                faculty_name="Dr. Kasturi Ghosh",
                domain="Quantum Computing",
                duration="8 months",
                requirements="Understanding of quantum mechanics, Python programming, familiarity with Qiskit or similar frameworks, strong mathematical background",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Explainable AI for Medical Decision Support",
                description="Develop interpretable machine learning models for medical diagnosis. Focus on creating visualization tools and explanation mechanisms that help doctors understand AI predictions. Work with real clinical datasets.",
                faculty_name="Dr. Saumya Das",
                domain="Healthcare AI",
                duration="7 months",
                requirements="Knowledge of ML/DL, Python, experience with medical imaging or clinical data, interest in interpretability techniques",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="5G Network Optimization Using Machine Learning",
                description="Develop intelligent algorithms for optimizing 5G network performance. Work on resource allocation, handover management, and interference mitigation using reinforcement learning and deep learning techniques.",
                faculty_name="Dr. Chandrima Thakur",
                domain="5G Networks",
                duration="6 months",
                requirements="Understanding of wireless communication, machine learning fundamentals, Python/MATLAB programming, interest in networking",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Federated Learning for Privacy-Preserving Healthcare",
                description="Implement a federated learning framework for training ML models across multiple healthcare institutions without sharing sensitive patient data. Focus on privacy-preserving techniques and secure aggregation protocols.",
                faculty_name="Dr. Sandipan Biswas",
                domain="Privacy & ML",
                duration="7 months",
                requirements="Strong Python skills, knowledge of deep learning frameworks, understanding of cryptography basics, interest in privacy",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Adversarial Robustness in Deep Neural Networks",
                description="Research and develop defense mechanisms against adversarial attacks on deep learning models. Explore adversarial training, defensive distillation, and other robustness enhancement techniques with applications in security-critical systems.",
                faculty_name="Dr. Snigdha Madhab Ghosh",
                domain="ML Security",
                duration="6 months",
                requirements="Strong ML/DL background, PyTorch or TensorFlow, understanding of optimization, interest in security",
                status="ongoing",
                start_date="December 2024"
            ),
            Project(
                title="Smart City Traffic Management Using Computer Vision",
                description="Develop an AI-powered traffic management system using computer vision and edge computing. Implement real-time vehicle detection, traffic flow analysis, and intelligent signal control algorithms.",
                faculty_name="Riya Das",
                domain="Computer Vision",
                duration="8 months",
                requirements="Computer vision expertise, deep learning knowledge, OpenCV, real-time processing experience, interest in urban systems",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Network Intrusion Detection Using Deep Learning",
                description="Build an intelligent intrusion detection system using deep learning for analyzing network traffic patterns. Develop models capable of detecting zero-day attacks and novel threats in real-time.",
                faculty_name="Amitava Podder",
                domain="Network Security",
                duration="6 months",
                requirements="Knowledge of networking protocols, Python programming, ML/DL frameworks, understanding of cybersecurity",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Agricultural Yield Prediction Using Satellite Imagery and ML",
                description="Develop a system for predicting crop yields using satellite imagery, weather data, and machine learning. Apply hyperspectral image analysis and time series forecasting for accurate agricultural planning.",
                faculty_name="Sumana Mahanta",
                domain="Agriculture & AI",
                duration="7 months",
                requirements="Knowledge of remote sensing, machine learning, Python, image processing, interest in agriculture applications",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Reinforcement Learning for Autonomous Navigation",
                description="Implement reinforcement learning algorithms for autonomous robot navigation in complex environments. Work with simulation environments and real robotic platforms to develop and test navigation strategies.",
                faculty_name="Dr. Snigdha Madhab Ghosh",
                domain="Robotics & RL",
                duration="8 months",
                requirements="Understanding of RL algorithms, Python programming, experience with ROS (Robot Operating System) preferred, interest in robotics",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Cloud-Native Application Development with Kubernetes",
                description="Design and implement cloud-native applications using microservices architecture and Kubernetes. Focus on scalability, fault tolerance, and automated deployment pipelines for ML applications.",
                faculty_name="Gulfishan Mobin",
                domain="Cloud Computing",
                duration="6 months",
                requirements="Experience with Docker and Kubernetes, programming skills (Python/Java), understanding of DevOps practices, cloud platform knowledge",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Multi-Modal Biometric Authentication System",
                description="Develop an advanced biometric authentication system that fuses multiple modalities (fingerprint, face, iris, voice). Implement feature extraction, fusion algorithms, and anti-spoofing techniques.",
                faculty_name="Suvabrata Guharay",
                domain="Biometric Security",
                duration="7 months",
                requirements="Image processing knowledge, machine learning, Python/C++, understanding of biometric systems, interest in security",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Regional Language NLP: Low-Resource Language Processing",
                description="Develop NLP models for low-resource regional languages using transfer learning and data augmentation. Focus on machine translation, named entity recognition, and sentiment analysis for regional languages.",
                faculty_name="Bablu Pramanik",
                domain="NLP",
                duration="8 months",
                requirements="Strong NLP background, knowledge of transformers (BERT, GPT), Python programming, interest in linguistics",
                status="open",
                start_date="February 2025"
            ),
            Project(
                title="Time Series Forecasting for Energy Demand Prediction",
                description="Develop hybrid deep learning models combining LSTM, CNN, and attention mechanisms for accurate energy demand forecasting. Work with real-world energy consumption data from smart grids.",
                faculty_name="Dr. Sandipan Biswas",
                domain="Data Science",
                duration="6 months",
                requirements="Time series analysis experience, deep learning knowledge, Python, understanding of statistical methods",
                status="open",
                start_date="January 2025"
            ),
            Project(
                title="Soft Computing Approaches for Multi-Objective Optimization",
                description="Implement and compare various soft computing techniques including genetic algorithms, particle swarm optimization, and fuzzy logic for solving complex multi-objective optimization problems in engineering applications.",
                faculty_name="Dr. Shivnath Ghosh",
                domain="Soft Computing",
                duration="7 months",
                requirements="Understanding of optimization algorithms, MATLAB/Python programming, mathematical background, interest in evolutionary computation",
                status="open",
                start_date="February 2025"
            )
        ]
        
        db.session.add_all(projects)
        
        # ============================================
        # SEED INTERNSHIPS
        # ============================================
        internships = [
            Internship(
                company="Google",
                role="Software Engineering Intern",
                description="Work on cutting-edge projects in cloud computing and distributed systems. Collaborate with experienced engineers on real-world products.",
                domain="Software Engineering",
                location="Mountain View, CA",
                duration="12 weeks (Summer 2025)",
                stipend="$8,000/month",
                eligibility="Currently enrolled in CS/related degree, strong coding skills, GPA 3.5+",
                application_deadline="February 28, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Google"
            ),
            Internship(
                company="Microsoft",
                role="AI Research Intern",
                description="Join the AI research team to work on natural language processing and machine learning projects. Contribute to cutting-edge research publications.",
                domain="Artificial Intelligence",
                location="Redmond, WA",
                duration="10-12 weeks",
                stipend="$7,500/month",
                eligibility="Graduate students in AI/ML, published research preferred, Python expertise",
                application_deadline="March 15, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Microsoft"
            ),
            Internship(
                company="Amazon",
                role="Cloud Infrastructure Intern",
                description="Work with AWS teams on building scalable cloud solutions. Learn about distributed systems, microservices, and DevOps practices.",
                domain="Cloud Computing",
                location="Seattle, WA",
                duration="12 weeks",
                stipend="$7,000/month + housing",
                eligibility="Junior/Senior CS students, knowledge of Linux, AWS, Docker",
                application_deadline="March 1, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Amazon"
            ),
            Internship(
                company="Tesla",
                role="Autonomous Driving Intern",
                description="Contribute to Tesla's Autopilot team working on computer vision and sensor fusion for self-driving capabilities.",
                domain="Computer Vision",
                location="Palo Alto, CA",
                duration="16 weeks",
                stipend="$8,500/month",
                eligibility="Strong C++ and Python skills, computer vision experience, deep learning knowledge",
                application_deadline="February 15, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Tesla"
            ),
            Internship(
                company="Meta",
                role="Security Engineering Intern",
                description="Work on security infrastructure and privacy-preserving technologies. Help protect billions of users across Meta platforms.",
                domain="Cybersecurity",
                location="Menlo Park, CA",
                duration="12 weeks",
                stipend="$8,200/month + relocation",
                eligibility="Background in security, cryptography, or systems programming",
                application_deadline="March 10, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Meta"
            ),
            Internship(
                company="IBM",
                role="Quantum Computing Intern",
                description="Work with IBM Quantum team on quantum algorithms and applications. Access to real quantum computers and simulators.",
                domain="Quantum Computing",
                location="Yorktown Heights, NY",
                duration="10 weeks",
                stipend="$6,500/month",
                eligibility="Physics or CS background, knowledge of quantum mechanics, Python/Qiskit",
                application_deadline="February 20, 2025",
                company_logo="https://via.placeholder.com/200x100?text=IBM"
            ),
            Internship(
                company="NVIDIA",
                role="Deep Learning Intern",
                description="Work on GPU-accelerated deep learning frameworks and applications. Optimize neural network performance.",
                domain="Artificial Intelligence",
                location="Santa Clara, CA",
                duration="12 weeks",
                stipend="$7,800/month",
                eligibility="Strong ML background, CUDA programming, PyTorch/TensorFlow experience",
                application_deadline="March 5, 2025",
                company_logo="https://via.placeholder.com/200x100?text=NVIDIA"
            ),
            Internship(
                company="Coinbase",
                role="Blockchain Developer Intern",
                description="Build features for cryptocurrency trading platform. Work with smart contracts and blockchain infrastructure.",
                domain="Blockchain",
                location="San Francisco, CA",
                duration="12 weeks",
                stipend="$7,200/month",
                eligibility="Understanding of blockchain, Solidity, web3.js, full-stack skills",
                application_deadline="February 25, 2025",
                company_logo="https://via.placeholder.com/200x100?text=Coinbase"
            )
        ]
        
        db.session.add_all(internships)
        
        # ============================================
        # SEED USERS
        # ============================================
        users = [
            User(
                name="John Doe",
                email="john@student.edu",
                password="password123",
                role="student"
            ),
            User(
                name="Jane Smith",
                email="jane@student.edu",
                password="password123",
                role="student"
            ),
            User(
                name="Admin User",
                email="admin@university.edu",
                password="admin123",
                role="admin"
            )
        ]
        
        db.session.add_all(users)
        
        # ============================================
        # SEED SAMPLE APPLICATIONS
        # ============================================
        applications = [
            Application(
                student_name="John Doe",
                student_email="john@student.edu",
                student_phone="+1-555-1234",
                application_type="research",
                project_id=1,
                project_title="AI-Powered Medical Image Analysis System",
                cover_letter="I am very interested in healthcare AI and have experience with PyTorch and TensorFlow. I would love to contribute to this project.",
                status="pending"
            ),
            Application(
                student_name="John Doe",
                student_email="john@student.edu",
                student_phone="+1-555-1234",
                application_type="research",
                project_id=5,
                project_title="Blockchain-Based Secure Data Management System",
                cover_letter="I have been following blockchain technology closely and have built several smart contracts using Solidity. This project aligns perfectly with my interests.",
                status="accepted"
            ),
            Application(
                student_name="John Doe",
                student_email="john@student.edu",
                student_phone="+1-555-1234",
                application_type="research",
                project_id=10,
                project_title="Natural Language Processing for Sentiment Analysis",
                cover_letter="I am passionate about NLP and have worked with BERT and transformer models. I am excited to work on sentiment analysis for social media data.",
                status="pending"
            ),
            Application(
                student_name="John Doe",
                student_email="john@student.edu",
                student_phone="+1-555-1234",
                application_type="internship",
                internship_id=2,
                internship_company="Microsoft",
                cover_letter="I am a graduate student specializing in AI research and would love to contribute to Microsoft's AI research team.",
                status="pending"
            ),
            Application(
                student_name="John Doe",
                student_email="john@student.edu",
                student_phone="+1-555-1234",
                application_type="internship",
                internship_id=5,
                internship_company="NVIDIA",
                cover_letter="I have experience with CUDA programming and deep learning optimization. NVIDIA's work in GPU-accelerated computing fascinates me.",
                status="rejected"
            ),
            Application(
                student_name="Jane Smith",
                student_email="jane@student.edu",
                student_phone="+1-555-5678",
                application_type="internship",
                internship_id=1,
                internship_company="Google",
                cover_letter="I am excited about working at Google on cloud computing and distributed systems.",
                status="accepted"
            ),
            Application(
                student_name="Jane Smith",
                student_email="jane@student.edu",
                student_phone="+1-555-5678",
                application_type="research",
                project_id=8,
                project_title="IoT-Based Smart Agriculture Monitoring System",
                cover_letter="I am interested in applying IoT and ML to solve real-world agricultural problems.",
                status="pending"
            )
        ]
        
        db.session.add_all(applications)
        
        # Commit all changes
        db.session.commit()
        
        print("✅ Database seeded successfully!")
        print(f"- {len(papers)} papers added")
        print(f"- {len(faculty_members)} faculty members added")
        print(f"- {len(projects)} projects added")
        print(f"- {len(internships)} internships added")
        print(f"- {len(users)} users added")
        print(f"- {len(applications)} sample applications added")

if __name__ == '__main__':
    seed_database()
