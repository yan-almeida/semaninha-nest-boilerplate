import { Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppMessage } from '../common/appMessage.common';

export function ApiController(controllerName: string): ClassDecorator {
  return function (target): void {
    Controller(controllerName)(target);
    ApiTags(controllerName)(target);

    ApiBadRequestResponse({
      description: 'Erro de validação, por parte do cliente.',
      type: AppMessage,
    })(target);
    ApiNotFoundResponse({ description: 'Nenhum dado encontrado.', type: null })(
      target,
    );
    ApiUnauthorizedResponse({
      description: 'Usuário não autenticado.',
      type: AppMessage,
    })(target);
    ApiConflictResponse({
      description: 'Dado já existente.',
      type: AppMessage,
    })(target);
    ApiInternalServerErrorResponse({
      description: 'Erro de execução do servidor.',
      type: AppMessage,
    })(target);
  };
}
