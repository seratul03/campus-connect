from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_NAME = 'google/flan-t5-base'
TARGET_DIR = 'models/google/flan-t5-base'

print('Downloading tokenizer...')
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
print('Downloading model... (this may take a while)')
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

print(f'Saving to {TARGET_DIR} ...')
model.save_pretrained(TARGET_DIR)
tokenizer.save_pretrained(TARGET_DIR)
print('Model and tokenizer saved.')
