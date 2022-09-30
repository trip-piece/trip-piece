interface NickNameValidationProps {
  nickname?: string;
}

export default function NickNameValidation({
  nickname,
}: NickNameValidationProps) {
  const errors: NickNameValidationProps = {};

  if (!nickname) {
    errors.nickname = "이름이 입력되지 않았습니다.";
  }

  return errors;
}
