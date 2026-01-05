import sys
import subprocess
import os

MODEL_NAME = "google/pegasus-cnn_dailymail"
SAVE_DIR = r"C:\Users\Seratul Mustakim\Desktop\Ai saves\admin_style\campus-connect-main\campus-connect-main\models\pegasus_cnn_dailymail"


def install_dependencies():
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install",
            "--upgrade",
            "transformers",
            "torch",
            "sentencepiece"
        ])
        print("✅ Dependencies installed successfully.")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies.")
        return False


def download_and_save_model():
    try:
        from transformers import PegasusForConditionalGeneration, PegasusTokenizer

        os.makedirs(SAVE_DIR, exist_ok=True)

        print("⬇️ Downloading model from Hugging Face...")
        tokenizer = PegasusTokenizer.from_pretrained(MODEL_NAME)
        model = PegasusForConditionalGeneration.from_pretrained(MODEL_NAME)

        print("💾 Saving model locally...")
        tokenizer.save_pretrained(SAVE_DIR)
        model.save_pretrained(SAVE_DIR)

        print(f"✅ Model successfully saved to:\n{SAVE_DIR}")
        return True

    except Exception as e:
        print("❌ Model download or save failed.")
        print("Error:", str(e))
        return False


def verify_model():
    try:
        from transformers import pipeline

        summarizer = pipeline(
            "summarization",
            model=SAVE_DIR,
            tokenizer=SAVE_DIR
        )

        test_text = (
            "Pegasus is a transformer-based model designed for abstractive text summarization. "
            "It performs exceptionally well on news articles and structured long-form content."
        )

        result = summarizer(
            test_text,
            min_length=20,
            max_length=40,
            do_sample=False
        )

        print("📝 Sample summary:")
        print(result[0]["summary_text"])
        print("✅ Model verification successful.")
        return True

    except Exception as e:
        print("❌ Model verification failed.")
        print("Error:", str(e))
        return False


if __name__ == "__main__":
    print("🔧 Installing Pegasus Summarization Model\n")

    if not install_dependencies():
        sys.exit(1)

    print("\n🚀 Downloading & saving model locally...\n")
    if not download_and_save_model():
        sys.exit(1)

    print("\n🧪 Verifying saved model...\n")
    if verify_model():
        print("\n🎉 SETUP COMPLETE: Model is installed, saved, and ready to use.")
    else:
        print("\n🚨 SETUP FAILED: Model saved but verification failed.")
