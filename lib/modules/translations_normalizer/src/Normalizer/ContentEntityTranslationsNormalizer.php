<?php

namespace Drupal\translations_normalizer\Normalizer;

use Drupal\serialization\Normalizer\ContentEntityNormalizer;

class ContentEntityTranslationsNormalizer extends ContentEntityNormalizer {

  protected $supportedInterfaceOrClass = 'Drupal\node\NodeInterface';

  public function normalize($entity, $format = NULL, array $context = array()) {
    $attributes = parent::normalize($entity, $format, $context);

    $attributes['node_translations'] = ['en', 'bg'];

    return $attributes;
  }

}
